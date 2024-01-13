const express=require("express");
const app=express();
const port=5000;

// app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/register",(req,res)=>{
    let{username:user,pass}=req.query;
    res.send(`Standard Get Response for user: ${user}`);
})

app.post("/register",(req,res)=>{
    let{username,password}=req.body;
    res.send(`Standard Post response:${username}`);
});

app.listen(port,()=>{
    console.log(`Listening To Port ${port}`);
})



