const mongoose=require("mongoose");

main()
.then(()=>{
    console.log("The connection is Successfull");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect("mongodb://127.0.0.1/amazon");
}

const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    pages:{
        type:Number,

    },
    author:{
        type:String,
        trim:false,
    },
    price:{
        type:Number,
        default:300,
        min:[50,"Price is too low for Amazon"]
    }
});
const book=new mongoose.model("books",bookSchema);

book.findByIdAndUpdate("654dc591d2900346c8feea29",{price:600},{new:true,runValidators:true})
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
})

// let book1=new book({
//     title:"Beauty of The Sand",
//     pages:353,
//     author:"Dr.Perterland & Sons",
//     price:244
// })

// book1.save()
// .then((res)=>{
//     console.log("Saved Successfully");
// }).catch((err)=>{
//     console.log(err.errors.price.properties.message);
// })



