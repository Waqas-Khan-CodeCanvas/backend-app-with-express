import nodemailer from "nodemailer";
import { env } from "../config/env.js";

// // @desc Send email using nodemailer
// // @param {string} to
// // @param {string} subject
// // @param {string} html
export const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: env.EMAIL_HOST,
    port: env.EMAIL_PORT,
    auth: { user: env.EMAIL_USER, pass: env.EMAIL_PASS },
  });

  await transporter.sendMail({ from: env.EMAIL_USER, to, subject, html });
};
