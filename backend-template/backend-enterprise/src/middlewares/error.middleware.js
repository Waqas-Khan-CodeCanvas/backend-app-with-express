import { logger } from "../config/logger.js";

// // @desc Global error handler
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  if (statusCode >= 500 || !err.isOperational) {
    logger.error(err, "Unexpected error occurred");
  } else {
    logger.debug(err, "Operational error");
  }

  res.status(statusCode).json({
    status: "error",
    message,
  });
};
