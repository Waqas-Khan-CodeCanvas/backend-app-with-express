import { asyncHandler } from "../utils/asyncHandler.js";
import {register,login,logout,} from "../services/auth.service.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ENV } from "../config/env.js";

const registerUser = asyncHandler(async (req, res) => {
  const createdUser = await register(req.body);
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "Regiser successfully."));
});

const loginUser = asyncHandler(async (req, res) => {
  const {user, refreshToken , accessToken} = await login(req.body);

  let httpOptions = {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: "strict",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, httpOptions)
    .cookie("refreshToken", refreshToken, httpOptions)
    .json(new ApiResponse(200, user, "login successfully."));
});

const logoutUser = asyncHandler(async (req, res) => {
  const logedOutUser = await logout(req.body);
  if (logedOutUser) {
    return res
      .status(200)
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json(new ApiResponse(200, "logout successfully."));
  }
});

// const resetUserPassword = asyncHandler(async (req, res) => {});
// const verifyUserEmail = asyncHandler(async (req, res) => {});
// const sendEmailOTP = asyncHandler(async (req, res) => {});

export { registerUser , loginUser , logoutUser}