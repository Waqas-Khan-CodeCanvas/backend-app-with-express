import "dotenv/config";
import { logger } from "./logger.js";

// // @desc Validate required environment variables
const requiredEnvVariables = [
  "NODE_ENV",
  "PORT",
  "MONGODB_URI",
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
  "JWT_REFRESH_SECRET",
  "EMAIL_HOST",
  "EMAIL_PORT",
  "EMAIL_USER",
  "EMAIL_PASS",
];

requiredEnvVariables.forEach((key) => {
  if (!process.env[key]) {
    logger.error(`Required environment variable is missing: ${key}`);
    process.exit(1);
  }
});

export const env = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: Number(process.env.PORT),
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: Number(process.env.EMAIL_PORT),
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
};
