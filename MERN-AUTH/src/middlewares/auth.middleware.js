import JWT, { TokenExpiredError } from 'jsonwebtoken';
import { ENV } from '../config/env.js';
import ApiError from "../utils/apiError.js";
import User from "../models/user.model.js"

const protect =async (req, _, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token =
      req.cookies?.accessToken || authHeader?.startsWith('Bearer ')
        ? authHeader.split(" ")[1]
        : null;

    if(!token){
        return next(new ApiError(401 , "Access token not provided"))
    }   
    
    const decoded = JWT.verify(token , ENV.JWT_ACCESS_TOKEN_SECRET_KEY);
    const user = await User.findById(decoded._id);
    if(!user){
        next(new ApiError(401 , "Invalid access token "))
    }

    req.user = user
    return next()
  } catch (err) {
    if(err.name == TokenExpiredError){
        return next(new ApiError(401 , "Access token expired."))
    }

    return next(new ApiError(401 , "Invalid access token provided."))
  }
};


export default protect;