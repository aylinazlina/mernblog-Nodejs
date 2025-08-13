const mongoose=require("mongoose")

const { Schema } = mongoose;


const userSchema=new Schema({

    userName:{
        type:String,
        required:true,
        trim:true,
        min:[5,"Username must be at least 5 characters"],
        max:[20,"Username must be at most 20 characters"]
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    avatar:{
        type:String,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        min:[6,"Password must be at least 6 characters"],
        max:[13, "Password must be at most 13 characters "]
    },
    lastlogin:{
        type:Date,
        trim:true,
    },
    phoneNumber:{
        type:String,
        trim:true,
        required:true,
        min:[11,"phone number must be at least 11 characters"]
    },
    permenentAddress:{
        type:String,
        trim:true,
     
    },
    presentAddress:{
        type:String,
        trim:true,
    },

},{
    timstamps:true,
}
)

module.exports=mongoose.model("User",userSchema)