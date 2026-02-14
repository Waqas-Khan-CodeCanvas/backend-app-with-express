import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { getProfile, updateUser } from "../services/user.service.js";

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await getProfile(req.user._id);

  res.json(new ApiResponse(200, "Profile fetched", user));
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await updateUser(req.user._id, req.body);

  res.json(new ApiResponse(200, "Profile updated", user));
});

export { getUserProfile, updateUserProfile };
