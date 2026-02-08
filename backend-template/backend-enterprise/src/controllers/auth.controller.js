// import { asyncHandler } from "../utils/asyncHandler.js";
// import { AuthService } from "../services/auth.service.js";
// import { apiResponse } from "../utils/apiResponse.js";

// // // @desc Register new user
// // // @route POST /api/auth/register
// // // @access Public
// export const registerUser = asyncHandler(async (req, res) => {
//   const result = await AuthService.register(req.body);
//   apiResponse(res, 201, "success", result, "User registered successfully. Check your email to verify.");
// });

// // // @desc Login user
// // // @route POST /api/auth/login
// // // @access Public
// export const loginUser = asyncHandler(async (req, res) => {
//   const result = await AuthService.login(req.body);
//   apiResponse(res, 200, "success", result, "Login successful");
// });

// // // @desc Verify email
// // // @route GET /api/auth/verify-email
// // // @access Public
// export const verifyEmail = asyncHandler(async (req, res) => {
//   const result = await AuthService.verifyEmail(req.query.token);
//   apiResponse(res, 200, "success", null, result.message);
// });

// // // @desc Forgot password
// // // @route POST /api/auth/forgot-password
// // // @access Public
// export const forgotPassword = asyncHandler(async (req, res) => {
//   const result = await AuthService.forgotPassword(req.body.useremail);
//   apiResponse(res, 200, "success", null, result.message);
// });

// // // @desc Reset password
// // // @route POST /api/auth/reset-password
// // // @access Public
// export const resetPassword = asyncHandler(async (req, res) => {
//   const { token, newPassword } = req.body;
//   const result = await AuthService.resetPassword(token, newPassword);
//   apiResponse(res, 200, "success", null, result.message);
// });

// // // @desc Refresh JWT token
// // // @route POST /api/auth/refresh-token
// // // @access Public
// export const refreshToken = asyncHandler(async (req, res) => {
//   const { refreshToken } = req.body;
//   const result = await AuthService.refreshToken(refreshToken);
//   apiResponse(res, 200, "success", result, "Token refreshed successfully");
// });




// src/controllers/auth.controller.js
import { AuthService } from "../services/auth.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";

// // @desc Login user
// // @route POST /api/auth/login
export const loginUser = asyncHandler(async (req, res) => {
  const { useremail, password } = req.body;

  const { accessToken, refreshToken } = await AuthService.login({ useremail, password });

  // Set refresh token in HttpOnly cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return apiResponse(res, 200, { accessToken });
});

// // @desc Refresh access token
// // @route POST /api/auth/refresh-token
export const refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;

  const { accessToken, refreshToken: newRefreshToken } = await AuthService.refreshToken(token);

  // Update refresh token cookie
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return apiResponse(res, 200, { accessToken });
});
