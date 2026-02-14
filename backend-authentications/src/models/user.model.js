import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{type:String , required:true , trim:true},
    useremail:{type:String , required:true , trim:true , unique:true},
    password:{type:String , required:true , trim:true , select:false},
    refreshToken:{type:String , default:"" , select:false},
    isActive:{type:Boolean , default:true},
    role:{type:String , enum:["user" , "admin"] , default:"user"},
    userProfileImgUrl:{type:String , default:""},
});

export const User = mongoose.model("User" , userSchema)