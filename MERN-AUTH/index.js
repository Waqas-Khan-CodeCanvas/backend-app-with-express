import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { ENV } from "./src/config/env.js";


const PORT = ENV.PORT;
connectDB()
.then(()=>{
    app.listen(PORT , ()=>{
        console.log(`app is servering at ${PORT}`)
    })
})
.catch((err)=>{
    console.log(`App is not running due to : ${err.message}`)
})





