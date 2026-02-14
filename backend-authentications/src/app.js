import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { corsOptions } from "./config/cors.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


//  Routes
import authRouter  from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"


app.use("/api/v1/auth" , authRouter)

app.get("/health", (req, res) => res.status(200).json({ status: "OK" }));
app.use((req, res) => res.status(404).json({ message: "Route not found" }));


app.use(errorMiddleware);

export { app };
