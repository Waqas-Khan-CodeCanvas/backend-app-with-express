// import { logger } from "../config/logger.js";

// export const errorHandler = (err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const isOperational = err.isOperational || false;

//   // Determine response message
//   const message =
//     statusCode >= 500 && !isOperational
//       ? "Internal Server Error"
//       : err.message;

//   // Structured logging with request context
//   const logData = {
//     err,
//     req: {
//       method: req.method,
//       url: req.originalUrl,
//       body: req.body,
//       params: req.params,
//       query: req.query,
//     },
//   };

//   if (statusCode >= 500 && !isOperational) {
//     logger.fatal(logData, "Unexpected error occurred");
//   } else {
//     logger.warn(logData, "Operational error");
//   }

//   // Respond safely to client
//   res.status(statusCode).json({
//     status: "error",
//     message,
//   });
// };





import { logger } from "../config/logger.js";

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  if (statusCode >= 500) {
    logger.error(err, `Unexpected error: ${err.message}`);
  } else {
    logger.warn(err, `Operational error: ${err.message}`);
  }

  res.status(statusCode).json({
    status: "error",
    message,
  });
};
