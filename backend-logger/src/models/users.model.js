import mongoose ,{Schema} from "mongoose";

const userSchema = new Schema({
    username:{type:String , require:true , trim:true},
    useremail:{type:String , require:true , trim:true , unique:true},
    password:{type:String , require:true , trim:true},
    role:{type:String ,emun:["admin","user"] , default:"user"},
    isActive:{type:String , default:true}
},{timestamps:true});

export const User = mongoose.model("User" , userSchema);
