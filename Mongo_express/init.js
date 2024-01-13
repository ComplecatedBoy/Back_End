const mongoose=require("mongoose");
const Chat=require("./models/Chat.js")

main()
.then((res)=>{
    console.log("Connected with the MongoDB");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect("mongodb://localhost:27017/whatsapp")
}

let allChats=[
    {
        from:"Anita",
        to:"Sunita",
        msg:"Don't Forget To Call me Later",
        created_at:new Date()
    },
    {
        from:"Me",
        to:"Myselft",
        msg:"What a Fuss!Man!",
        created_at:new Date()
    },
    {
        from:"Naruto",
        to:"Luffy",
        msg:"You Are Funny Men!",
        created_at:new Date()
    },
    {
        from:"Baba",
        to:"Pankaj",
        msg:"Something is better than nothing",
        created_at:new Date()
    },
    {
        from:"Satyam",
        to:"Jaan",
        msg:"I am Missing you,girl!",
        created_at:new Date()
    }
]

Chat.insertMany(allChats);

