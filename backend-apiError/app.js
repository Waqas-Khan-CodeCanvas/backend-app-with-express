import express from "express";
import userRouter from "./routes/users.routes.js";
import { apiError } from "./utils/apiError.js";

const app = express();

app.use(express.json());


app.use("/api/users", userRouter)

app.use((err , req , res , next ) => {
  
    res.status(err.statusCode).json({message:err})

}
)




export default app;