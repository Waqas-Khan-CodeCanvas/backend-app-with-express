import asyncHandler from '../utils/asyncHandler.js';
import { register, login, logout } from '../services/auth.service.js';
import ApiResponse from '../utils/apiResponse.js';
import { ENV } from '../config/env.js';

const registerUser = asyncHandler(async (req, res) => {
  const user = await register(req.body);
  res.status(201).json(new ApiResponse(201, 'Registerd successfully.', user));
});

const loginUser = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await login(req.body);

  const httpOptions = {
    httpOnly: true,
    secure: ENV.NODE_ENV == 'production',
    sameSite: 'strict',
  };

  res
    .status(200)
    .cookie('accessToken', accessToken, httpOptions)
    .cookie('refreshToken', refreshToken, httpOptions)
    .json(new ApiResponse(200, user, 'login successfully.'));
});

const logoutUser = asyncHandler(async (req, res) => {
  const user = await logout(req.body);
  if (user) {
    res
      .status(200)
      .clearCookie('accessToken')
      .clearCookie('refreshToken')
      .json(new ApiResponse(200, 'logout successfully.'));
  }
});


export {registerUser , loginUser , logoutUser}