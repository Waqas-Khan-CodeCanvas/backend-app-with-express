import nodemailer from "nodemailer";
import "dotenv/config";

// test with ethereal
// const sendEmail = async () => {
//   try {
//     const testAccount = await nodemailer.createTestAccount();

//     const transporter = nodemailer.createTransport({
//       host: testAccount.smtp.host,
//       port: testAccount.smtp.port,
//       secure: testAccount.smtp.secure,
//       auth: {
//         user: testAccount.user,
//         pass: testAccount.pass,
//       },
//     });

//     const info = await transporter.sendMail({
//       from: `"Test App" <${testAccount.user}>`,
//       to: "recipient@example.com",
//       subject: "Hello from Ethereal!",
//       text: "This message was sent using Ethereal.",
//       html: "<p>This message was sent using <b>Ethereal</b>.</p>",
//     });

//     console.log("Message sent: %s", info.messageId);
//     console.log("Preview: %s", nodemailer.getTestMessageUrl(info));
//   } catch (err) {
//     console.log(err);
//   }
// };


// with real sevice (sender and recevier)
const sendEmail = async (to, subject, text)=>{
    try {
        const transpoter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS
            }
        })

        const mailOptions = {
            from:`from <${process.env.EMAIL_USER}>`,
            to:to,
            subject:subject,
            text:text,
            html:`<h3>${text}</h3>`
        }


        const info  = await  transpoter.sendMail(mailOptions);
        console.log(`Email send : ${info.response}`)
    } catch (err ) {
        console.log(`Email failed : ${err}`)
    }
}

export default sendEmail;
