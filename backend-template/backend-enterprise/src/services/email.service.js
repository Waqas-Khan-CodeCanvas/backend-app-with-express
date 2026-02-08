import nodemailer from "nodemailer";
import { env } from "../config/env.js";
import { logger } from "../config/logger.js";

// // @desc Email Service to send verification and reset emails
export class EmailService {
  // // @desc Create nodemailer transporter
  static transporter() {
    return nodemailer.createTransport({
      host: env.EMAIL_HOST,
      port: env.EMAIL_PORT,
      secure: env.EMAIL_PORT === 465, // true for 465, false for other ports
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
      },
    });
  }

  // // @desc Send email
  // // @param {string} to - recipient email
  // // @param {string} subject - email subject
  // // @param {string} html - email html content
  static async sendEmail({ to, subject, html }) {
    try {
      const transporter = this.transporter();

      const info = await transporter.sendMail({
        from: env.EMAIL_FROM,
        to,
        subject,
        html,
      });

      logger.info(`Email sent to ${to}: ${info.messageId}`);
      return info;
    } catch (error) {
      logger.error(error, `Failed to send email to ${to}`);
      throw new Error("Email sending failed");
    }
  }

  // // @desc Send email verification link
  // // @param {string} to - recipient email
  // // @param {string} token - verification token
  static async sendVerificationEmail(to, token) {
    const url = `${env.FRONTEND_URL}/verify-email?token=${token}`;

    const html = `
      <h3>Email Verification</h3>
      <p>Please click the link below to verify your email:</p>
      <a href="${url}">${url}</a>
      <p>This link will expire in ${env.EMAIL_VERIFICATION_TOKEN_EXPIRES_IN}</p>
    `;

    return this.sendEmail({ to, subject: "Verify your email", html });
  }

  // // @desc Send password reset link
  // // @param {string} to - recipient email
  // // @param {string} token - password reset token
  static async sendPasswordResetEmail(to, token) {
    const url = `${env.FRONTEND_URL}/reset-password?token=${token}`;

    const html = `
      <h3>Password Reset</h3>
      <p>Click the link below to reset your password:</p>
      <a href="${url}">${url}</a>
      <p>This link will expire in ${env.RESET_PASSWORD_TOKEN_EXPIRES_IN}</p>
    `;

    return this.sendEmail({ to, subject: "Reset your password", html });
  }
}
