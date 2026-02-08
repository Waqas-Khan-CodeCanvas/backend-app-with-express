// import mongoose, { Schema } from "mongoose";

// // // @desc User schema for authentication
// const userSchema = new Schema(
//   {
//     username: { type: String, required: true, trim: true },
//     useremail: { type: String, required: true, trim: true, unique: true },
//     password: { type: String, required: true, trim: true },
//     role: { type: String, enum: ["admin", "user"], default: "user" },
//     isActive: { type: Boolean, default: true },
//     emailVerified: { type: Boolean, default: false },
//     emailVerificationToken: String,
//     resetPasswordToken: String,
//     resetPasswordExpires: Date,
//     refreshToken: String,
//   },
//   { timestamps: true }
// );

// export const User = mongoose.model("User", userSchema);






import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    useremail: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    isActive: { type: Boolean, default: false },

    // Email verification
    emailVerificationToken: String,
    emailVerificationExpires: Date,

    // Password reset
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
