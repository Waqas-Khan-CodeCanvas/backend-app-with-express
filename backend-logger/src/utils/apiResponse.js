export const apiResponse = (res, statusCode, status, data = null, message = "") => {
  return res.status(statusCode).json({ status, message, data });
};
