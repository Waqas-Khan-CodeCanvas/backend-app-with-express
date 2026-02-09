import { ENV } from "./env.js";
import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () =>{

    if(isConnected){
        console.warn("MongoDB is already connected.")
        return;
    }

    try {
        const conn = await mongoose.connect(ENV.MONGODB_URI , {
            autoIndex:false,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000 , 
            socketTimeoutMS: 45000
        })
    
        console.log(`MongoDB has connected successfully at : ${conn.connection.host} `);
        isConnected = true; 
        
    } catch (error) {
        console.log(`MongoDB connection failed : ${error.message}`);
        process.exit(1)  // stop server 
    }

}