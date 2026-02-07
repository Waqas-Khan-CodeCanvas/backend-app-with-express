import "dotenv/config";
import { logger } from "./logger.js";

const requiredEnvVariables = ["NODE_ENV", "PORT", "MONGODB_URI"];

// Validate required env variables
requiredEnvVariables.forEach((key) => {
  if (!process.env[key]) {
    logger.fatal(`Required environment variable missing: ${key}`);
    process.exit(1);
  }
});

// Validate PORT
const port = Number(process.env.PORT);
if (Number.isNaN(port) || port <= 0) {
  logger.fatal(`PORT environment variable is invalid: ${process.env.PORT}`);
  process.exit(1);
}

// Export frozen config to prevent mutation
export const env = Object.freeze({
  NODE_ENV: process.env.NODE_ENV,
  PORT: port,
  MONGODB_URI: process.env.MONGODB_URI,
});
