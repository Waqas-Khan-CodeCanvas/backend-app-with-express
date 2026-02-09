import { app } from "./src/app.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import {logger} from "./src/config/logger.js";

import { connectDB } from "./src/config/db.js";

connectDB().then(() => {
  app.listen(3000, () => {
    console.log("app is running on 300");
    logger.info('Server running on port 3000');
  });
})
.catch((err)=>{
    console.log(`MongoDB connection failed : ${err.message}`)
})

