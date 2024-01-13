const express=require("express");
const app=express();

let port=8080;

app.listen(port,()=>{
    console.log(`This Programm is listening to port ${port}`);
})

app.get("/",(req,res)=>{
    res.send("You contacted root Path");
})
app.get("/apple/",(req,res)=>{
    res.send("You contacted Apple Path");
})

app.get("/orange/",(req,res)=>{
     res.send("You contacted Orange Path");
})


app.post("/",(req,res)=>{
    res.send("You posted to Root path");
})

let fruits={
    mango:'red',
    banana:'yellow',
    grape:'lightGreen'
}

app.get("/search",(req,res)=>{
    let {q}=req.query;
    if(!q)res.send(`Nothing Searched`)
    else {
        console.log(fruits[q]);
            if(fruits[q]){
                res.send(`The color of the ${q} is ${fruits[q]}`)
            }else {
                res.send(`Info Not Available about: ${q}`);
            }
        }
    
})



// app.use((req,res)=>{
//     console.log("Request Recieved");
//     code=`<h1>Fruits</h1>
//         <ul>
//             <li>Mango</li>
//             <li>Banana</li>
//             <li>Orange</li>
//         </ul>`

//     res.send(code);
// })
