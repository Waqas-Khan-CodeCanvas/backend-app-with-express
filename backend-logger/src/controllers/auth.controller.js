import { AuthService } from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";

export const registerUser = asyncHandler(async (req, res) => {
  const data = await AuthService.register(req.body);
  apiResponse(res, 201, "success", data, "User registered successfully");
});

export const loginUser = asyncHandler(async (req, res) => {
  const data = await AuthService.login(req.body);
  apiResponse(res, 200, "success", data, "Login successful");
});
