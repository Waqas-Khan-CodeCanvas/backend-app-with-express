// // @desc Standard API response
// // @param {Object} res
// // @param {number} statusCode
// // @param {string} status
// // @param {Object} data
// // @param {string} message
export const apiResponse = (res, statusCode, status, data = null, message = "") =>
  res.status(statusCode).json({ status, message, data });
