import "dotenv/config"
import { logger } from "./logger.js";
const requiredEnvVariables  = ["NODE_ENV", "PORT" , "MONGODB_URI" ];

requiredEnvVariables.forEach((key) => {
    if(!process.env[key]){
        logger.warn(`Required enviornment variable is missing : ${key}`);
        process.exit(1)
    }
});

export const env = {
    NODE_ENV:process.env.NODE_ENV,
    PORT:Number(process.env.PORT),
    MONGODB_URI:process.env.MONGODB_URI,
}