import express from "express"
import { logger } from "./config/logger.js";

const app  = express()







app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  logger.info('Hello route accessed');
  res.send('Hello World!');
});




logger.info('User created');
logger.warn('Invalid login attempt');
logger.error(new Error('Database connection failed'));


app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).send('Something broke!');
});

export  {app}