const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Savita",
});

try {
  connection.query("USE delta_app", (err, result) => {
    if (err) throw err;
    console.log(result);
  });
} catch (err) {
  console.log(err);
}

try {
  connection.query(
    "CREATE table IF NOT EXISTS user(id varchar(50) primary Key,username varchar(40) unique,email varchar(50) Not null unique,password varchar(50) NOT null)",
    (err, result) => {
      if (err) throw err;
      console.log(result);
    }
  );
} catch (err) {
  console.log(err);
}

let data=[];
for(let i=0;i<100;i++){
  data.push(getUser());
}

let q="INSERT INTO user(id,username,email,password)VALUES ?";
try {
  connection.query(q,[data],(err, result) => {
    if (err) throw err;
    console.log(result);
  });
} catch (err) {
  console.log(err);
}



try {
  connection.query("Show tables", (err, result) => {
    if (err) throw err;
    console.log(result);
  });
} catch (err) {
  console.log(err);
}


function getUser(){
  return [
       faker.string.uuid(),
      faker.internet.userName(),
      faker.internet.email(),
      faker.internet.password()
  ];
}

try {
  connection.query("SELECT * FROM user",(err, result) => {
    if (err) throw err;
    console.log(result);
  });
} catch (err) {
  console.log(err);
}

// setTimeout(() => {
//   try {
//     connection.query("drop table user", (err, result) => {
//       if (err) throw err;
//       console.log(result);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }, 5000);

// connection.query(
//   'CREATE DATABASE IF NOT EXISTS delta_app',function(err,result,fields){
//    console.log("Delta_app is Created:",result,err,fields);
//   }
//   )

// try {
//   connection.query(
//     'Show databases',function(err,result,fields){
//       if(err)throw err;
//      console.log("RESULT: ",result);
//     }
//     )
// } catch (err) {
//   console.log(err);
// }


