import JWT from "jsonwebtoken";
import { ENV } from "../config/env.js";



const generateAccessToken = (payload)=>{
    if(!payload || typeof payload !== "object"){
        throw new TypeError(`generateAccessToken expect object payload.`)
    }

    return JWT.sign(payload, ENV.JWT_ACCESS_TOKEN_SECRET_KEY , {expiresIn:ENV.JWT_ACCESS_TOKEN_EXPIRY})
}
const generateRefreshToken = (payload)=>{
    if(!payload || typeof payload !== "object"){
        throw new TypeError(`generateRefresToken expect object payload.`)
    }

    return JWT.sign(payload , ENV.JWT_REFRESH_TOKEN_SECRET_KEY , {expiresIn:ENV.JWT_REFRESH_TOKEN_EXPIRY})
}

export {generateAccessToken , generateRefreshToken}