import mongoose from "mongoose";
import { logger } from "./logger.js";
import { ENV } from "./env.js";


let isConnected = false ; 

const connectDB = async ()=>{

    try {
        if(isConnected){
            logger.info("MongoDB is already connected.");
            return;
        }
    
        const conn = await mongoose.connect(ENV.MONGODB_URI , {
            autoIndex:false , 
            maxPoolSize: 10 ,
            serverSelectionTimeoutMS: 5000 , 
            socketTimeoutMS:45000
        })
    
        logger.info(`MongoDB is connected successfully, at : ${conn.connection.host}`);
        isConnected = true;
    } catch (error) {
        logger.error(error , "MongoDB connection failed.");
        process.exit(1)  // terminate the server gracefully
    }
}

export {connectDB}