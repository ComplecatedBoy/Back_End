// let obj=require("./math");
// console.log(obj.sum(obj.PI,obj.E));
// console.log(obj.mul(obj.PI,obj.E));

// let info=require("./Fruits")
// console.log(info[0].name)
// console.log(info[0].color)

import {sum,mul,PI,E} from "./math.js";

console.log(sum(PI,E));
console.log(mul(PI,E));

import { generate } from "random-words";

for (let index = 10; index >0; index--){
    console.log(generate());
}

