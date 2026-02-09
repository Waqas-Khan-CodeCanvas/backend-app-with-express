import "dotenv/config"


const requiredEnvVariables = ["NODE_ENV" , "PORT" , "MONGODB_URI" , "CROSS_ORIGIN" , "ACCESS_TOKEN_SECRET" ,"ACCESS_TOKEN_EXPIRY","REFRESH_TOKEN_SECRET","REFRESH_TOKEN_EXPIRY"];

requiredEnvVariables.forEach((key) => {
    if(!process.env[key]){
        console.log(`Missing required .env varialble : ${key}`);
        process.exit(1) // stop server 
    }
});


export const ENV = {
    PORT:Number(process.env.PORT),
    NODE_ENV:process.env.NODE_ENV,
    MONGODB_URI:process.env.MONGODB_URI,
    CROSS_ORIGIN:process.env.CROSS_ORIGIN,
    ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY:process.env.ACCESS_TOKEN_EXPIRY,
    REFRESH_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRY:process.env.REFRESH_TOKEN_EXPIRY
}