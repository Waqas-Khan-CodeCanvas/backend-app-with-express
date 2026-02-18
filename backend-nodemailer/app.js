import express from "express"
import sendEmail from "./sendEmail.js"

const app = express()

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true , limit:"16kb"}))

app.get("/", (req, res) => {
  res.send(`
    <form method="POST" action="/send">
      <input type="email" name="email" placeholder="Enter email" required />
      <input type="text" name="subject" placeholder="Subject" required />
      <textarea name="message" placeholder="Message"></textarea>
      <button type="submit">Send Email</button>
    </form>
  `);
});


app.post("/send", async (req, res) => {
  const { email, subject, message } = req.body;

  await sendEmail(email, subject, message);

  res.send("Email Sent Successfully!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});