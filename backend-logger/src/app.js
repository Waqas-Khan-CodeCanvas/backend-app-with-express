import express  from "express";
import {errorHandler}  from "./middlewares/error.middleware.js";
import userRouter  from "./routes/auth.routes.js";
import { formatDate } from "./utils/fromatDate.js";

const app = express();

app.use(express.json());

// Routes
app.use("/users", userRouter);

const date = formatDate("this is a date")
console.log(date)
// Global Error Handler
app.use(errorHandler);

export default app;
