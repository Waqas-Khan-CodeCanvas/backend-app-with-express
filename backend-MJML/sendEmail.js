import nodemailer from "nodemailer";


const sendEmail =async ()=>{
    try {
        const testAccount = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            host:testAccount.smtp.host,
            port:testAccount.smtp.port,
            secure:testAccount.smtp.secure,
            auth:{
                user:testAccount.user,
                pass:testAccount.pass
            }
        });

        const mailOptions = {
            from:`"test App" <${testAccount.user}>`,
            to:"waqas@gmail.com",
            subject:"hi this is subject",
            text:"za mara zan la de kar katale de",
            html:"<p>hello world</p>"
        };

        const info = await transporter.sendMail(mailOptions);
        const emailPrvUrl = nodemailer.getTestMessageUrl(info);

        console.log(`Email send successfully. : ${info.response}`);
        console.log(`Prview your email at : ${emailPrvUrl}`);
        return true;
    } catch (err) {
        console.log(`Email failed. ${err}`);
        return false;
    }
}

export default sendEmail;