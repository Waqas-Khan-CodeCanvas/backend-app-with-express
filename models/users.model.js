import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true, trim: true },
    useremail: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const User = mongoose.model("User" , userSchema);


