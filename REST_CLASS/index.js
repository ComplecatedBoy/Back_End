const epxress = require("express");
const app = epxress();
const port = 4000;
const{ v4:uuidv4 }=require("uuid")
const methodOverride=require("method-override");

let posts = [
  {
    id:uuidv4(),
    username: "Tuntun",
    content: "I Love Coding!",
  },
  {
    id:uuidv4(),
    username: "Shradhha",
    content: "Na Kam No Jyada!",
  },
  {
    id:uuidv4(),
    username: "TamatarPrasad",
    content: "I'm Changing my name to RaduChandra",
  },
  {
    id:uuidv4(),
    username: "LaLa",
    content: "MY Name is LALa BSd WALA",
  },
];

const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(methodOverride("_method"))

app.use(epxress.static(path.join(__dirname, "public")));

app.use(epxress.urlencoded({ extended: true }));
// app.use(epxress.json());

app.get("/", (req, res) => {
  res.redirect("/posts/");
});

app.get("/posts", (req, res) => {
  res.render("posts.ejs", { posts });
});

app.post("/posts", (req, res) => {
  let {username,content}=req.body;
  let id=uuidv4();
  posts.push({id,username,content});
  res.redirect("/posts")
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/posts/:id",(req,res)=>{
   let{ id }=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("show.ejs",{ post });
});

app.patch("/posts/:id",(req,res)=>{
    let { id }=req.params;
    let newContent=req.body.content;
    posts.find((p)=> id===p.id).content=newContent;
    res.redirect("/posts");
})


app.get("/posts/:id/edit",(req,res)=>{
    let{ id }=req.params;
    let post=posts.find((p)=>(id===p.id));
    res.render("Edit.ejs",{ post });
})

app.delete("/posts/:id",(req,res)=>{
  let { id }=req.params;
  console.log(id);
  posts=posts.filter((p)=>(id !== p.id));
  res.redirect("/posts")
})

app.listen(port, () => {
  console.log("Listening To The Port: ", port);
});
