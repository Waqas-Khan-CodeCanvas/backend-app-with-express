import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";

// // @desc User Service for CRUD operations
export class UserService {
  // // @desc Create a new user (Admin can create)
  static async createUser({ username, useremail, password, role = "user" }) {
    const existing = await User.findOne({ useremail });
    if (existing) throw new ApiError(409, "Email already registered");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, useremail, password: hashedPassword, role });
    return user;
  }

  // // @desc Get all users (Admin)
  static async getAllUsers() {
    return await User.find().select("-password -refreshToken");
  }

  // // @desc Get user by ID
  static async getUserById(id) {
    const user = await User.findById(id).select("-password -refreshToken");
    if (!user) throw new ApiError(404, "User not found");
    return user;
  }

  // // @desc Update user (Admin)
  static async updateUser(id, updates) {
    const user = await User.findById(id);
    if (!user) throw new ApiError(404, "User not found");

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    Object.assign(user, updates);
    await user.save();
    return user;
  }

  // // @desc Delete user (Admin)
  static async deleteUser(id) {
    const user = await User.findById(id);
    if (!user) throw new ApiError(404, "User not found");
    await user.remove();
    return { message: "User deleted successfully" };
  }
}
