import express from "express"
import { logger } from "./config/logger.js";

const app = express();


logger.info('Information message');
logger.error('Error message');

// now we can use the logger to log messages as we want
logger.error('Hello, Winston!');
logger.warn('An error occurred!');
logger.info('Warning: This is a warning!');



app.listen(3000 , ()=>{
    console.log("app is running on 3000");
})