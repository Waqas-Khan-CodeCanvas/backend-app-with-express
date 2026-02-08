import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";

// // @desc Protect routes
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) return next(new ApiError(401, "Not authorized"));

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) throw new ApiError(401, "User not found");

    req.user = user; // Attach user to request
    next();
  } catch (err) {
    return next(new ApiError(401, "Token invalid or expired"));
  }
};

// // @desc Role based access control
export const authorizeRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(new ApiError(403, "You do not have permission to access this resource"));
  }
  next();
};
