import mongoose from "mongoose";
import { ENV } from "./env.js";


let isConnected = false
const connectDB = async ()=>{
    
    if(isConnected){
        console.log(`MongoDB is already connected`);
        return;
    }

    try {
        const conn = await mongoose.connect(ENV.MONGODB_URI , {
            autoIndex:false ,
            maxPoolSize: 10,
            serverSelectionTimeoutMS:5000,
            socketTimeoutMS:45000
        })

        console.log(`MongoDB is connected successfully at : ${conn.connection.host}`)
        isConnected = true;

        
    } catch (err) {
        console.log(`MongoDB connection failed : ${err.message}`)
        process.exit(1)
    }

}

export default connectDB;