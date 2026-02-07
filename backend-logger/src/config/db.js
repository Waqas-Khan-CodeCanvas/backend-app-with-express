import mongoose from "mongoose";
import { env } from "./env.js";
import { logger } from "./logger.js";

let isConnected = false;

export const connectDB = async ()=>{

    if(isConnected){
        logger.info("mongoDb is already connected.");
        return;
    }

    try {
        const conn = await mongoose.connect( env.MONGODB_URI , {
            autoIndex:false,
            maxPoolSize:10,
            serverSelectionTimeoutMS:5000,
            socketTimeoutMS:45000
        })
    
        logger.info(`MongoDB is connected : ${conn.connection.host}`)
        isConnected = true; 
    } catch (error) {
        logger.debug( error, `MongoDB connection is failed : ${error.message}`)
        process.exit(1)
    }
} 