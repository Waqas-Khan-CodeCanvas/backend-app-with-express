import { logger } from "../config/logger.js";

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Log based on severity
  if (statusCode >= 500 || !err.isOperational) {
    logger.error(err, "Unexpected error");
  } else {
    logger.debug(err, "Operational error");
  }

  res.status(statusCode).json({
    status: "error",
    message,
  });
};


