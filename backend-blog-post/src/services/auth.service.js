import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { checkFields } from "../utils/checkFields.js";
import { validateEmail } from "../utils/validateEmail.js";
import { hashPassword, comparePassword } from "../utils/hashPasswordAndComparePassword.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateAccessTokenAndRefreshToken.js";

const register = async (fields) => {
  const { username, useremail, password } = fields;

  const invalidFields = checkFields({ username, useremail, password });
  if (invalidFields.length) {
    throw new ApiError(400, `Missing fields: ${invalidFields.join(", ")}`);
  }

  if (!validateEmail(useremail)) {
    throw new ApiError(400, "Invalid email format");
  }

  const existingUser = await User.findOne({ useremail });
  if (existingUser) {
    throw new ApiError(409, "Email already registered");
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    username,
    useremail,
    password: hashedPassword,
  });

  return {
    _id: user._id,
    username: user.username,
    useremail: user.useremail,
  };
};

const login = async ({ useremail, password }) => {
  const invalidFields = checkFields({ useremail, password });
  if (invalidFields.length) {
    throw new ApiError(400, `Missing fields: ${invalidFields.join(", ")}`);
  }

  const user = await User.findOne({ useremail }).select("+password +refreshToken");

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const payload = { _id: user._id, role: user.role };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};

const logout = async (userId) => {
  await User.findByIdAndUpdate(userId, { refreshToken: "" });
};

export { register, login, logout };
