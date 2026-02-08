// // @desc Wrap async functions to handle errors
// // @param {Function} fn
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
