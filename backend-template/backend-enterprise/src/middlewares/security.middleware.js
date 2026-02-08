import rateLimit from "express-rate-limit";
import cors from "cors";
import { env } from "../config/env.js";

// ==============================
// CORS Middleware
// ==============================
export const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow non-browser requests like Postman

    const allowedOrigins = env.CORS_ORIGIN.split(",");
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
});

// ==============================
// Rate Limiting Middleware
// ==============================
export const rateLimiterMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    status: "error",
    message: "Too many requests from this IP, please try again later.",
  },
});
