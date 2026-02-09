import mongoose from "mongoose";
import { env } from "./env";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log("MongoDB is already connected.");
    return;
  }

  try {
    const conn = await mongoose.connect(env.MONGODB_URI, {
      autoIndex: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 10000,
    });

    console.log(`MongoDB is connected : ${conn.connection.host}`);
    isConnected = true;
  } catch (err) {
    console.log(`MongoDB connection is failed : ${err.message}`)
    process.exit(1)     // terminate due to connection failed
  }
};
