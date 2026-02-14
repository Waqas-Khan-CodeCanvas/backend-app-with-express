import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";

const getProfile = async (userId) => {
  const user = await User.findById(userId).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

const updateUser = async (userId, data) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    data,
    { new: true }
  ).select("-password -refreshToken");

  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }

  return updatedUser;
};

export { getProfile, updateUser };
