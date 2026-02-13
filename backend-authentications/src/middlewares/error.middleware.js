import { logger } from "../utils/logger.js";
import { ENV } from "../config/env.js";

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  // Log error with winston
  logger.error({
    message: err.message,
    statusCode,
    method: req.method,
    url: req.originalUrl,
    userId: req.user?._id || null,
    stack: err.stack,
  });

  res.status(statusCode).json({
    success: false,
    message:
      ENV.NODE_ENV === "production"
        ? "Something went wrong"
        : err.message,
    ...(ENV.NODE_ENV !== "production" && { stack: err.stack }),
  });
};

export { errorMiddleware };
