import express from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser';

import errorMiddleware from './middlewares/error.middleware.js';


const app = express()


// middlewares
app.use(cors({origin:"*"}))
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true , limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());


// routes
import authRouter from './routes/auth.routes.js';


app.use("/api/v1/auth" , authRouter);




app.use(errorMiddleware)





export default  app;