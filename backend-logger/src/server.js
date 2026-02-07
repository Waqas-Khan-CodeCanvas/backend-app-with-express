import app from "./app.js";
import { logger } from "./config/logger.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(env.PORT, () => {
      logger.info(`Server running on port ${env.PORT}`);
    });
  })
  .catch((error) => {
    logger.error(error , `MongoDB connection is failed : ${error.message}`);
    process.exit(1);
  });
