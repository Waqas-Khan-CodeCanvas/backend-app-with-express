import { ApiError } from "../utils/apiError.js";

// // @desc Role-based access control middleware
// // @param {...string} roles - allowed roles for this route
export const authorizeRoles = (...roles) => (req, res, next) => {
  if (!req.user) return next(new ApiError(401, "Not authorized"));

  if (!roles.includes(req.user.role)) {
    return next(new ApiError(403, "You do not have permission to access this resource"));
  }

  next();
};
