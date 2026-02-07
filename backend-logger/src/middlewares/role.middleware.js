import { ApiError } from "../utils/apiError.js";

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user) throw new ApiError(401, "User not authenticated");
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "You do not have permission to perform this action");
    }
    next();
  };
};
