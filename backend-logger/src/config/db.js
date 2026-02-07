import mongoose from "mongoose";
import { env } from "./env.js";
import { logger } from "./logger.js";

let isConnected = false;

/**
 * Connects to MongoDB using Mongoose.
 * Ensures singleton connection.
 */
export const connectDB = async () => {
  if (isConnected) {
    logger.info("MongoDB is already connected.");
    return;
  }

  try {
    const conn = await mongoose.connect(env.MONGODB_URI, {
      autoIndex: false,              // Don't build indexes automatically in prod
      maxPoolSize: 10,               // Connection pool
      serverSelectionTimeoutMS: 5000, // Fail fast if DB unreachable
      socketTimeoutMS: 45000,
    });

    logger.info({ host: conn.connection.host }, "MongoDB connected successfully");
    isConnected = true;

  } catch (error) {
    logger.fatal({ err: error, uri: env.MONGODB_URI }, "MongoDB connection failed");
    process.exit(1);
  }
};
