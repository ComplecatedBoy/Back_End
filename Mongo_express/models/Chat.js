const mongoose=require("mongoose")

const Chat= mongoose.model("Chat",new mongoose.Schema({
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    msg:{
        type:String,
        maxLength:90
    },
    created_at:{
        type:Date,
        Default:Date.now()
    }
}));

module.exports=Chat;