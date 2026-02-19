import express from "express"
import cors  from "cors"
import sendEmail from "./sendEmail.js";
import otpPage from "./otp.js";

const app = express();

app.use(cors({origin:"*"}))
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true , limit:"16kb"}))
app.use(express.static("public"))



app.get("/", (_,res) => {
  res.send(`
    <form method="POST" action="/send">
      <input type="email" name="email" placeholder="Enter email" required /><br>
      <input type="text" name="subject" placeholder="Subject" required /><br>
      <textarea name="message" placeholder="Message"></textarea><br>
      <button type="submit">Send Email</button>
    </form>
  `);
});

app.post("/send" , async (req, res )=>{
    const {email , subject, message }  = req.body;
    const isSend = await sendEmail()
    if(isSend){
        res.send("send successfully.")
    }else{
        res.send("Email failed.")
    }
})

app.get("/otp" , (req, res)=>{
     
    res.send(otpPage())
})

const PORT = 5000;
app.listen(PORT , ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})
