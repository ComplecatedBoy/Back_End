const express = require("express");
const app = express();

const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//Building the connection ot DATABASE
const mongoose = require("mongoose");

main()
  .then((res) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
//REQUIRING MODEL
const Chat = require("./models/Chat.js");

//method_override
const method_override = require("method-override");
app.use(method_override("_method"));

//Home Page
app.get("/chats", async (req, res) => {
  let allchats = await Chat.find();
  res.render("Chats.ejs", { allchats });
});

//Create New Chat
app.get("/chats/new", (req, res) => {
  res.render("New.ejs");
});

app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body;
  if (from && to) {
    let newChat = new Chat({
      from: from,
      to: to,
      msg: msg,
      created_at: new Date(),
    });

    newChat
      .save()
      .then((res) => {
        console.log(res);
        console.log("New Chat is Added");
      })
      .catch((err) => {
        console.log(err);
      });

    res.redirect("/chats");
  } else {
    res.send("Sender And Reciever info is mandatory");
  }
});

//edit route
app.get("/chats/:id/edit", async (req, res) => {
    let{ id }=req.params;
    let chat= await Chat.findById( id );
    res.render("edit.ejs",{ chat })
});

app.patch("/chats/:id",(req,res)=>{
    let { id }=req.params;
    let {msg}=req.body;

    Chat.findByIdAndUpdate( id,{ msg:msg } )
    .then((res)=>{
        console.log("update SuccessFully!")
    }).catch((err)=>{
        console.log(err)
    }) 

    res.redirect("/chats");
})

//delete route
app.delete("/chats/:id", (req, res) => {
  let { id } = req.params;
  Chat.deleteOne({ _id: id })
    .then((res) => {
      console.log("DELETED SuCcessfully");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/chats");
});

//For the Home Page of the Website
app.get("/", (req, res) => {
  res.render("home.ejs");
});

const port = 8808;
//Listening to http://localhost:8808/
app.listen(port, () => {
  console.log(`Listening to Port: ${port}`);
});
