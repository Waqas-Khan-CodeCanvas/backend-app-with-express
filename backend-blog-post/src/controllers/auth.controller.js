import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { register, login, logout } from "../services/auth.service.js";

const registerUser = asyncHandler(async (req, res) => {
  const user = await register(req.body);

  res.status(201).json(
    new ApiResponse(201, "User registered successfully", user)
  );
});

const loginUser = asyncHandler(async (req, res) => {
  const { accessToken, refreshToken } = await login(req.body);

  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .json(new ApiResponse(200, "Login successful"));
});

const logoutUser = asyncHandler(async (req, res) => {
  await logout(req.user._id);

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.json(new ApiResponse(200, "Logged out successfully"));
});

export { registerUser, loginUser, logoutUser };
