
import { ENV } from "../config/env.js";
import jwt from "jsonwebtoken";


// @desc  - genrate JWT token
// @param({Object}) - playload -> data to encode e.g {userId , useremail,role ...}
// @return JWT token
// @useCase const token = await generateAuthToken(playload)

const generateAccessToken = (payload)=>{
    if(!payload || typeof payload !== "object"){
        throw new TypeError("generateAccessToken expects a payload object");
    }

    return jwt.sign(payload , ENV.JWT_ACCESS_TOKEN_SECRET_KEY , {expiresIn:ENV.JWT_ACCESS_TOKEN_EXPIRY});
}

const generateRefreshToken = (payload)=>{
    if(!payload || typeof payload !== "object"){
        throw new TypeError("generateRefreshToken expects a payload object");
    }

    return jwt.sign(payload , ENV.JWT_REFRESH_TOKEN_SECRET_KEY ,{expiresIn: ENV.JWT_REFRESH_TOKEN_EXPIRY});
}

export {generateAccessToken , generateRefreshToken}