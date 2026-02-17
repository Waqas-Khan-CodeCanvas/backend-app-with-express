import mongoose , {Schema} from "mongoose";


const userSchema = new Schema({
    username:{type:String , required:true , trim:true},
    useremail:{type:String , required:true , trim:true , unique:true , index:true},
    password:{type:String , required:true , trim:true , select:false},
    refreshToken:{type:String , default:"" , select:false},
    userImageUrl:{type:String , default:""},
    role:{type:String , enum:["admin" , "user"] , default:"user"},
    isActive:{type:Boolean, default:false},
}, {timestamps:true})

export const User = mongoose.model("User" , userSchema)