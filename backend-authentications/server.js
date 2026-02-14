import { app } from "./src/app.js";
import { logger } from "./src/config/logger.js";
import "./src/config/db.js"; // DB connection
import { ENV } from "./src/config/env.js";
import { connectDB } from "./src/config/db.js";

const PORT = ENV.PORT;

connectDB()
.then(()=>{
   app.listen(PORT, () => {
  logger.info(`Server running in ${ENV.NODE_ENV} mode on port ${PORT}`);
});

})
.catch((err)=>{
  logger.error("connection failed error: " , err);
})
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
