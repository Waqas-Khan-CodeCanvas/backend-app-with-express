import mongoose from "mongoose";
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";

// // @desc Connect to MongoDB
let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    logger.info("MongoDB already connected.");
    return;
  }

  try {
    const conn = await mongoose.connect(env.MONGODB_URI, {
      autoIndex: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    logger.info(`MongoDB connected: ${conn.connection.host}`);
    isConnected = true;
  } catch (err) {
    logger.error(err, `MongoDB connection failed: ${err.message}`);
    process.exit(1);
  }
};
