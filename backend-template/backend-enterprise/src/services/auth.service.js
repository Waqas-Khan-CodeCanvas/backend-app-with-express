// import bcrypt from "bcryptjs";
// import crypto from "crypto";
// import { User } from "../models/user.model.js";
// import { env } from "../config/env.js";
// import { ApiError } from "../utils/apiError.js";
// import { validateEmail } from "../utils/validateEmail.js";
// import { generateToken } from "../utils/generateToken.js";
// import { sendEmail } from "../utils/sendEmail.js";

// export class AuthService {
//   // // @desc Register a new user and send verification email
//   static async register({ username, useremail, password }) {
//     if (!username || !useremail || !password)
//       throw new ApiError(400, "All fields are required");

//     if (!validateEmail(useremail)) throw new ApiError(400, "Invalid email");

//     const existingUser = await User.findOne({ useremail });
//     if (existingUser) throw new ApiError(409, "Email already registered");

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const emailVerificationToken = crypto.randomBytes(32).toString("hex");

//     const user = await User.create({
//       username,
//       useremail,
//       password: hashedPassword,
//       emailVerificationToken,
//     });

//     const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${emailVerificationToken}`;
//     await sendEmail(
//       useremail,
//       "Verify your email",
//       `<p>Please verify your email by clicking <a href="${verifyUrl}">here</a></p>`
//     );

//     return { id: user._id, username: user.username, useremail: user.useremail };
//   }

//   // // @desc Login user and return JWT & Refresh token
//   static async login({ useremail, password }) {
//     if (!useremail || !password)
//       throw new ApiError(400, "Email and password required");

//     const user = await User.findOne({ useremail });
//     if (!user) throw new ApiError(401, "Invalid credentials");
//     if (!user.emailVerified) throw new ApiError(403, "Email not verified");

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) throw new ApiError(401, "Invalid credentials");

//     const token = generateToken({ id: user._id, role: user.role }, env.JWT_SECRET, env.JWT_EXPIRES_IN);
//     const refreshToken = generateToken({ id: user._id }, env.JWT_REFRESH_SECRET, "7d");

//     user.refreshToken = refreshToken;
//     await user.save({ validateBeforeSave: false });

//     return { token, refreshToken, user: { id: user._id, username: user.username, role: user.role } };
//   }

//   // // @desc Verify email token
//   static async verifyEmail(token) {
//     const user = await User.findOne({ emailVerificationToken: token });
//     if (!user) throw new ApiError(400, "Invalid or expired token");

//     user.emailVerified = true;
//     user.emailVerificationToken = undefined;
//     await user.save({ validateBeforeSave: false });
//     return { message: "Email verified successfully" };
//   }

//   // // @desc Generate password reset token & send email
//   static async forgotPassword(useremail) {
//     const user = await User.findOne({ useremail });
//     if (!user) throw new ApiError(404, "User not found");

//     const resetToken = crypto.randomBytes(32).toString("hex");
//     user.resetPasswordToken = resetToken;
//     user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
//     await user.save({ validateBeforeSave: false });

//     const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
//     await sendEmail(
//       useremail,
//       "Reset Password",
//       `<p>Reset password link: <a href="${resetUrl}">Click Here</a></p>`
//     );

//     return { message: "Password reset email sent" };
//   }

//   // // @desc Reset password using token
//   static async resetPassword(token, newPassword) {
//     const user = await User.findOne({
//       resetPasswordToken: token,
//       resetPasswordExpires: { $gt: Date.now() },
//     });
//     if (!user) throw new ApiError(400, "Invalid or expired token");

//     user.password = await bcrypt.hash(newPassword, 10);
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;
//     await user.save({ validateBeforeSave: false });

//     return { message: "Password reset successfully" };
//   }

//   // // @desc Refresh JWT token
//   static async refreshToken(token) {
//     const user = await User.findOne({ refreshToken: token });
//     if (!user) throw new ApiError(401, "Invalid refresh token");

//     const newToken = generateToken({ id: user._id, role: user.role }, env.JWT_SECRET, env.JWT_EXPIRES_IN);
//     return { token: newToken };
//   }
// }







import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { env } from "../config/env.js";
import { EmailService } from "./email.service.js";

// // @desc Auth Service
export class AuthService {
  // // @desc Register new user
  static async register({ username, useremail, password, role }) {
    const existing = await User.findOne({ useremail });
    if (existing) throw new ApiError(409, "Email already registered");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      useremail,
      password: hashedPassword,
      role,
      isActive: false, // User inactive until email verification
    });

    // Generate email verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    user.emailVerificationToken = crypto.createHash("sha256").update(verificationToken).digest("hex");
    user.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    await user.save({ validateBeforeSave: false });

    // Send verification email
    await EmailService.sendVerificationEmail(user.useremail, verificationToken);

    return { userId: user._id };
  }

  // // @desc Verify user email
  static async verifyEmail(token) {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) throw new ApiError(400, "Token invalid or expired");

    user.isActive = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return { message: "Email verified successfully" };
  }

  // // @desc Login user
  static async login({ useremail, password }) {
    const user = await User.findOne({ useremail });

    if (!user || !user.isActive) throw new ApiError(401, "Invalid credentials or email not verified");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ApiError(401, "Invalid credentials");

    return this.generateTokens(user);
  }

  // // @desc Forgot password
  static async forgotPassword(useremail) {
    const user = await User.findOne({ useremail });
    if (!user) throw new ApiError(404, "User not found");

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.passwordResetExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save({ validateBeforeSave: false });

    // Send reset email
    await EmailService.sendPasswordResetEmail(useremail, resetToken);

    return { message: "Password reset email sent" };
  }

  // // @desc Reset password
  static async resetPassword(token, newPassword) {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) throw new ApiError(400, "Token invalid or expired");

    user.password = await bcrypt.hash(newPassword, 10);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    return { message: "Password reset successful" };
  }

  // // @desc Generate JWT and refresh token
  static generateTokens(user) {
    const payload = { id: user._id, role: user.role };

    const accessToken = jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
    const refreshToken = jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: env.JWT_REFRESH_EXPIRES_IN });

    return { accessToken, refreshToken };
  }

  // // @desc Refresh JWT token
  static async refreshToken(token) {
    if (!token) throw new ApiError(401, "Refresh token missing");

    try {
      const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) throw new ApiError(401, "User not found");

      return this.generateTokens(user);
    } catch (err) {
      throw new ApiError(401, "Invalid or expired refresh token");
    }
  }
}
