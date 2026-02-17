import checkRequiredFields from "../utils/checkRequiredFields.js";
import ApiError from "../utils/apiError.js";
import validateEmail from "../utils/validateEmail.js"
import { compairePassword, hashPassword } from "../utils/hashPasswordAndComparePassword.js";
import {User} from "../models/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateAccessTokenAndRefreshToken.js";


const register = async(fields) =>{

    try {
        const {username , useremail , password} = fields;
        const invalidfields = checkRequiredFields({username , useremail, password});
        if(invalidfields.length > 0){
            throw new ApiError(400 , `All fields are required : ${invalidfields.join(", ")} `);
        }
    
        if(!validateEmail(useremail)){
            throw new ApiError(400 , "invalid password");
        }
    
        const isUserExsit = await User.findOne({useremail});
        if(isUserExsit){
            throw new ApiError(409 , "Email already exist.");
        }
    
        const hashedPassword = await hashPassword(password);
        const user = User.create({
            username,
            useremail,
            password:hashedPassword
        })
    
        return user = {
            _id:user._id,
            username:user.username , 
            useremail:user.useremail ,
            role:user.role
        };
    } catch (err) {
        throw new ApiError(err.code , err.message)
    }
}

const login = async(fields) =>{
    try {
        const {useremail , password} = fields;
        const invalidFields = checkRequiredFields({useremail, password})
        if(invalidFields.length > 0){
            throw new ApiError(401 , `All fields are required. ${invalidFields.join(", ")}` );
        }
        
        if(!validateEmail(email)){
            throw new ApiError(401 , `Invalid email` );
        }
        
        const user = await User.findOne(useremail);
        
        const isPasswordCorrect = await compairePassword(password , user.password)
        if(!isPasswordCorrect){
            throw new ApiError(401 , `Invalid password.` );
        }
        const payload = {
            _id:user._id,
            useremail,
            password
        }

        const accessToken  = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        user.refreshToken = refreshToken;
        await user.save()

        return {user , accessToken , refreshToken}
    } catch (err) {
        throw new ApiError(err)
    }
}

const logout = async(fields) =>{
   try {
     const userId = fields._id;
     if(!userId){
         throw new ApiError(401 , "userId not provided.")
     }
 
     const user = await User.findById(userId).select("+refreshToken");
     if(!user){
         throw new ApiError(`Invalid userId : ${userId}` )
     }
 
     user.refreshToken = ""
     await user.save()
 
     return true
   } catch (err) {
     throw new ApiError(err)
   }
}

export {register , login , logout}