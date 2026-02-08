import { asyncHandler } from "../utils/asyncHandler.js";
import { UserService } from "../services/user.service.js";
import { apiResponse } from "../utils/apiResponse.js";

// // @desc Get all users (admin only)
// // @route GET /api/users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await UserService.getAllUsers();
  apiResponse(res, 200, "success", users, "Users fetched successfully");
});

// // @desc Get single user by ID
// // @route GET /api/users/:id
export const getUserById = asyncHandler(async (req, res) => {
  const user = await UserService.getUserById(req.params.id);
  apiResponse(res, 200, "success", user);
});

// // @desc Update user by ID
// // @route PUT /api/users/:id
export const updateUser = asyncHandler(async (req, res) => {
  const user = await UserService.updateUser(req.params.id, req.body);
  apiResponse(res, 200, "success", user, "User updated successfully");
});

// // @desc Delete user by ID
// // @route DELETE /api/users/:id
export const deleteUser = asyncHandler(async (req, res) => {
  const result = await UserService.deleteUser(req.params.id);
  apiResponse(res, 200, "success", result);
});
