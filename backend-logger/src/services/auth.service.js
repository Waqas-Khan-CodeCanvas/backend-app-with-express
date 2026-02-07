import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { env } from "../config/env.js";
import { ApiError } from "../utils/apiError.js";
import { validateEmail } from "../utils/validateEmail.js";

export class AuthService {
  // Register a new user
  static async register({ username, useremail, password }) {
    if (!username || !useremail || !password)
      throw new ApiError(400, "All fields are required");

    if (!validateEmail(useremail))
      throw new ApiError(400, "Invalid email format");

    const existingUser = await User.findOne({ useremail });
    if (existingUser)
      throw new ApiError(409, "Email is already registered");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      useremail,
      password: hashedPassword,
    });

    return {
      id: user._id,
      username: user.username,
      useremail: user.useremail,
      role: user.role,
    };
  }

  // Login user
  static async login({ useremail, password }) {
    if (!useremail || !password)
      throw new ApiError(400, "Email and password are required");

    const user = await User.findOne({ useremail });
    if (!user) throw new ApiError(401, "Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ApiError(401, "Invalid credentials");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN || "1d" }
    );

    return {
      token,
      user: { id: user._id, username: user.username, role: user.role },
    };
  }
}
