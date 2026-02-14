import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { checkFields } from "../utils/checkFields.util.js";
import { validateEmail } from "../utils/validateEmail.util.js";
import {User} from  '../models/user.model.js'
import { comparePassword, hashPassword } from "../utils/hashPasswordAndComparePassword.util.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateAccessTokenAndRefreshToken.util.js";



const register =  async (fields) =>{

    const {username , useremail , password } = fields;
    const invalidFields = checkFields({username , useremail, password});
    if(invalidFields.length > 0 ){
        throw new ApiError(400 , `Required fields : ${invalidFields.join(", ")}`)
    }

    if(!validateEmail(fields.useremail)){
        throw new ApiError(400 , "Email is not valid.")
    }

    const existUser = await User.findOne({useremail});
    if(existUser){
        throw new ApiError(409 , "Email already registerd.")
    }

    const hashedPassword  = await hashPassword(password);
    const user  = await User.create({
        username,
        useremail,
        password : hashedPassword
    })
    console.log("user : ", user)
    return {
     _id : user._id,
     username : user.username,
     useremail : user.useremail
    }

};

const login = async (fields ) =>{
    const {useremail  , password}  = fields;

    const invalidFields = checkFields({useremail , password});
    if(invalidFields.length){
        throw new ApiError(400  , `Required fields : ${invalidFields.join(", ")}` )
    }

    if(!validateEmail(useremail)){
        throw new ApiError(409 , "Email is not valid.");
    }

    const user = await User.findOne({useremail}).select("+password +refreshToken")
    
    const isPasswordValid = await comparePassword(password , user.password)
    if(!isPasswordValid){
        throw new ApiError(409 , "Password is not valid.")
    }

    const playload = {
        _id : user._id,
        username : user.username,
        useremail :user.useremail,
        role:user.role
    }

    const accessToken =generateAccessToken(playload);
    const refreshToken =generateRefreshToken(playload);

    user.refreshToken = refreshToken;
    await user.save()

    return {user:{
        _id : user._id,
        username:user.username,
        useremail:user.useremail
    },accessToken,refreshToken}


};

const logout =  async ({_id}) =>{
    
    if(!_id){
        throw new ApiError(400 , "User id is not provieded")
    }
    const user  = await User.findByIdAndUpdate(_id , {refreshToken: ""})
    return true;
};






const resetPassword = async (data ) =>{};
const verifyEmail = async (data ) =>{};
const sendOTP = async (data ) =>{};


export {
    register, 
    login , 
    logout ,
    resetPassword,
    verifyEmail,
    sendOTP
}