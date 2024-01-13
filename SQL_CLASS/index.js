const express=require("express");
const app=express();
const port=8080;

const path=require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,"/public")));


const mysql=require("mysql2");
const connection=mysql.createConnection({
    host:'localhost',
    user:"root",
    database:"delta_app",
    password:"Savita"
});

const methodOverride=require("method-override");
app.use(methodOverride("_method"));

const { faker }=require("@faker-js/faker");


app.use(express.urlencoded({ extended:true}));

//Home Route....
app.get("/",(req,res)=>{
    let q="SELECT count(*) FROM user";
    try{
        connection.query(q,(err,result)=>{
            if(err)throw err;
            let count=result[0]["count(*)"];
            res.render("Home.ejs",{ count });
        })
    }
    catch(err){
         res.send("The Some Error Occured");
    }
});

//User Route....
app.get("/user",(req,res)=>{
    let q='SELECT id,username,email FROM USER'
    try{
        connection.query(q,(err,result)=>{
            if(err)throw err;
            res.render("User.ejs",{ result });
        })
    }catch(err){
        res.send("Some Error Occured");
    }
})

//Edit Route
app.get("/user/:id/edit",(req,res)=>{
    let {id}=req.params;
    let q=`SELECT * FROM user WHERE id='${ id }'`;
    try {
        connection.query(q,(err,result)=>{
            if(err)throw err;
            let user=result[0];
            res.render("edit.ejs",{ user });
        })
    }catch(err) {
        res.send("Some ERROR Occured");
    }
});

//ADD New user
app.get("/user/new",(req,res)=>{
    res.render("New.ejs");
})

app.post("/user",(req,res)=>{
    let {email,username,password}=req.body;
    let id=faker.string.uuid();
    let q=`SELECT * FROM user WHERE email='${email}'`
    try {
        connection.query(q,(err,result)=>{
             if(result.length>0){
                res.send("Email Already REgistered");
             }else{
                let q=`INSERT INTO user (email,username,password,id)VALUES(?,?,?,?)`
                try {
                    connection.query(q,[email,username,password,id],(err,result)=>{
                          if(err)throw err;
                          res.redirect("/");
                    })
                } catch(err){
                    res.send("Some ERROR Occured");
                }
             }
        })
    } catch(err){
        res.send("Some ERROR Occured");
    }
})

//update route
app.patch("/user/:id",(req,res)=>{
   let { id }=req.params;
   let {newUserName,password}=req.body;
   let q=`SELECT * FROM USER WHERE id='${id}'`
   try {
    connection.query(q,(err,result)=>{
        if(err)throw err;
        console.log(result);
        if(result[0].password===password){
            let q=`UPDATE User SET username='${newUserName}' WHERE id='${id}'`;
            try {
                connection.query(q,(err,result)=>{
                    if(err)throw err;
                    res.redirect("/user")
                })
            } catch (err) {
                res.send("Some Error Occured in DB")
            }
        }else{
            res.send("PassWord Didn't Match");
        }
    })
   } catch (err) {
     res.send("Some Error Occured");
   }
})

//to delete the user
app.get("/user/:id/delete",(req,res)=>{
    let {id}=req.params;
    let q=`SELECT * FROM user WHERE id='${ id }'`;
    try {
        connection.query(q,(err,result)=>{
            if(err)throw err;
            let user=result[0];
            res.render("delete.ejs",{ user });
        })
    }catch(err) {
        res.send("Some ERROR Occured");
    }
});


app.delete("/user/:id",(req,res)=>{
    let { id }=req.params;
    let { password }=req.body;
    let q=`SELECT * FROM user WHERE id='${id}'`
    try {
        connection.query(q,(err,result)=>{
            if(err)throw err;
            if(result[0].password===password){
                let q=`DELETE FROM user Where id='${id}'`
                try {
                    connection.query(q,(err,result)=>{
                        if(err)throw err;
                        res.redirect("/")
                    })
                } catch (err) {
                    res.send("Some error Ocuured");
                }
            }else{
                res.send("Wrong PassWord");
            } 
        })  
    } catch (err) {
        res.send("Some eror occured");
    }

})


app.listen(port,()=>{
console.log(`Listening to the port :${port}`);
});

