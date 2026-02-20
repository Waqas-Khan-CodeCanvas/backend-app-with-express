import express from "express";
import indexPage from "./index.js";
import upload from "./multer.js";

const app = express();

app.get("/",(req, res )=>{
    res.send(indexPage())
})

app.post("/uploads" , upload.single("file") , (req , res)=>{
    res.send("file uploaded successfully.")
})

app.listen(5000,()=>{
    console.log(`app is running .`)
})