const mongoose = require("mongoose");

main()
  .then(() => {
    console.log("Connection Successfull");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Test");
}

let userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model("Users", userSchema);
const Employee = mongoose.model("Employee", userSchema);

// Employee.find({age:{$gt:100}}).then((data) => {
//   console.log(data.length);
// });

Employee.updateMany({age:{$gte:20}},{age:20})
.then((res)=>{
 console.log(res);
});

// Employee.insertMany([
//     {name:"Satyam",email:"Satyam123456789@gmail.com",age:34},
//     {name:"Situtu",email:"Situutud@gamil.com",age:35},
//     {name:"Peter",email:"Peter24@gmial.com",age:243}
// ])
// .then((data)=>{
//     console.log(data);
// })

// let user3=new User({
//     name:"BAJA",
//     email:"RAjaJI@gmail.com",
//     age:42,
//     surname:"Hindustani"

// });

// user3.save().then((res)=>{
//     console.log(res);
// })
// .catch(err=>{
//     console.log(err);
// });
