// function CreatePerson(name,age){
//     const person={
//         name:name,
//         age:age,
//         Intro(){
//             console.log(`Hello,My Name is ${name} and I am ${age} years old.`);
//         }
//     }
//     return person;
// }


// function Person(name,age,health){
//     this.name=name;
//     this.age=age;
//     this.health=health;
// }
// Person.prototype.talk=function(){
//     console.log(`This is Your Buddy: ${this.name}`);
// }

class Person{
    constructor(name,age){
        this.name=name;
        this.age=age;
    }
    talk(){
        console.log(`Hello,This is the ${this.name}`);
    }
}

let p1=new Person("Ram",45,55);
let p2=new Person("Shyam",34,80);
let p3=new Person("STK",12,90);
let p4=new Person("Satyam",21,10000);
let p5=new Person("Savita",19,3529);
let p6=new Person("Tomato",23,88875);
