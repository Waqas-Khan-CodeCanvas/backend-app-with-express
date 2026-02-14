import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";

import { corsOptions } from "./config/cors.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import rateLimitMiddleware from "./middleware/rateLimit.middleware.js";

import routes from "./routes/index.js";

const app = express();

// ✅ Security Headers
app.use(helmet());

// ✅ Rate Limiting
app.use(rateLimitMiddleware);

// ✅ Body Parsing
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// ✅ CORS
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// ✅ Static Files
app.use(express.static("public"));

// ✅ Cookie Parser
app.use(cookieParser());

// ✅ Data Sanitization
app.use(mongoSanitize());
app.use(xss());

// ✅ Compression
app.use(compression());

// ✅ Routes
app.use("/api/v1", routes);

// ✅ Health Check
app.get("/health", (req, res) => res.status(200).json({ status: "OK" }));

// ✅ 404 Handler
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// ✅ Error Handler
app.use(errorMiddleware);

export { app };
