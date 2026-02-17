import 'dotenv/config';

const requiredEnvVariables = [
    "PORT" ,
    "NODE_ENV", 
    "MONGODB_URI",
    "JWT_ACCESS_TOKEN_SECRET_KEY",
    "JWT_ACCESS_TOKEN_EXPIRY",
    "JWT_REFRESH_TOKEN_SECRET_KEY",
    "JWT_REFRESH_TOKEN_EXPIRY" ];


requiredEnvVariables.forEach((key) => {
    if(!process.env[key]){
        console.log(`Missing required env variable : ${key}`)
        process.exit(1)
    }
});

export const ENV = {
    PORT:Number(process.env.PORT),
    NODE_ENV : process.env.NODE_ENV,
    MONGODB_URI:process.env.MONGODB_URI,
    JWT_ACCESS_TOKEN_EXPIRY:process.env.JWT_ACCESS_TOKEN_EXPIRY,
    JWT_ACCESS_TOKEN_SECRET_KEY:process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
    JWT_REFRESH_TOKEN_SECRET_KEY:process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
    JWT_REFRESH_TOKEN_EXPIRY:process.env.JWT_REFRESH_TOKEN_EXPIRY
    
}

