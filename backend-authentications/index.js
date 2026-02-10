import { app } from "./src/server.js";
import { connectDB } from "./src/config/db.js";
import { logger } from "./src/config/logger.js";



connectDB().then(()=>{
    app.listen(3000,()=>{
    console.log("app is running on 3000")
})
})
.catch((err)=>{
    logger.error(err  , "MongoDB connection failed. due to ")
})



