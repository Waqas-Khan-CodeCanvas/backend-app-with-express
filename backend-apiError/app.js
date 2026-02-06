import express from 'express'
import { apiError } from './apiError.js';

const app = express();

app.use(express.json())
// app.use(express.urlencoded({extended:true}))


app.post("/" , (req , res )=>{
    const {name , email}  =req.body;
    console.log(name , email)

    if(!name){
        throw new apiError(400 , "bad request");
    }
    
    
})

app.listen(3000 , ()=>{
    console.log("app is running on port 3000");
})

