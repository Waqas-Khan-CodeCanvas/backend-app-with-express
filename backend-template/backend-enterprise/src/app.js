// import express from "express";
// import helmet from "helmet";
// import morgan from "morgan";
// import { errorHandler } from "./middlewares/error.middleware.js";
// import authRoutes from "./routes/auth.routes.js";
// import userRoutes from "./routes/user.routes.js";
// import { corsMiddleware, rateLimiterMiddleware } from "./middlewares/security.middleware.js";

// const app = express();

// // ==========================
// // Security
// // ==========================
// app.use(helmet()); // Secure headers
// app.use(corsMiddleware); // CORS
// app.use(rateLimiterMiddleware); // Rate limiting

// // ==========================
// // Body parser
// // ==========================
// app.use(express.json());

// // ==========================
// // Logger for dev
// // ==========================
// if (process.env.NODE_ENV !== "production") {
//   app.use(morgan("dev"));
// }

// // ==========================
// // Routes
// // ==========================
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);

// // ==========================
// // Health check
// // ==========================
// app.get("/health", (req, res) =>
//   res.json({ status: "success", message: "API running" })
// );

// // ==========================
// // Global Error Handler
// // ==========================
// app.use(errorHandler);

// export default app;



import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import { corsMiddleware, rateLimiterMiddleware } from "./middlewares/security.middleware.js";
import { env } from "./config/env.js";

const app = express();

// ==========================
// Security Headers
// ==========================
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        objectSrc: ["'none'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'"],
        frameSrc: ["'none'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    },
    crossOriginResourcePolicy: { policy: "cross-origin" },
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true }, // 1 year
  })
);

// ==========================
// CORS and Rate Limiting
// ==========================
app.use(corsMiddleware);
app.use(rateLimiterMiddleware);

// ==========================
// Body parser & cookies
// ==========================
app.use(express.json());
app.use(cookieParser()); // Required for refresh token cookies

// ==========================
// Logger for dev
// ==========================
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// ==========================
// Routes
// ==========================
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// ==========================
// Health check
// ==========================
app.get("/health", (req, res) =>
  res.json({ status: "success", message: "API running" })
);

// ==========================
// Global Error Handler
// ==========================
app.use(errorHandler);

export default app;
