import app from "./src/app.js";
import { connectDB } from "./src/db.js";
import { env } from "./src/config/env.js";
import { logger } from "./src/config/logger.js";

const startServer = async () => {
  await connectDB();

  app.listen(env.PORT, () => {
    logger.info(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
  });
};

startServer();
