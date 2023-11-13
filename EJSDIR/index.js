const express =require("express");
const app=express();
const port=8080;

const path=require("path")
app.use(express.static("public"));

app.set("view engine","ejs")

app.get("/",(req,res)=>{
    res.render("Home.ejs")
})

app.get("/rollDice",(req,res)=>{
    let DiceVal=Math.floor(Math.random()*6)+1;
    res.render("rollDice.ejs",{DiceVal})
})

app.get("/ig/:username",(req,res)=>{
    // let followers=["Ram","Savita","Pankaj","Shyam","Namrata"];
    // let {username}=req.params;
    // res.render("instagram.ejs",{User:username,followers});

    let {username}=req.params;

    let data=require("./lib/InstaData.json");
    if(data[username]){
        res.render("instagram.ejs",{user:data[username]});
    }else {
        res.render("err.ejs")
    }

})

app.listen(port,()=>{
    console.log("Listening to port:",port);
})