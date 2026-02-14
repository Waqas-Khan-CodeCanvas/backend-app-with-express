import { app } from "./app.js";
import { logger } from "./config/logger.js";
import "./config/db.js"; // DB connection

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Graceful Shutdown
const shutdown = () => {
  logger.info("Shutting down server gracefully...");
  server.close(() => {
    logger.info("Server closed");
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

// Global Process Handlers
process.on("uncaughtException", (err) => {
  logger.error("UNCAUGHT EXCEPTION", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  logger.error("UNHANDLED REJECTION", err);
  process.exit(1);
});
