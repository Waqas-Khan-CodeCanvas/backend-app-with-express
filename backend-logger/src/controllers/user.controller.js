import {ApiError} from "../utils/ApiError.js";
import {logger} from "../config/logger.js";

export const getUser = async (req, res, next) => {
  try {
    const user = true; // Example: pretend DB call
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }
    res.json({ user });
  } catch (err) {
    next(err); // unexpected errors
  }
};
