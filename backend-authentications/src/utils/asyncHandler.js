







// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }











/**
 * @desc Wraps async route handlers and forwards errors to Express error middleware
 * @param {Function} fn - async route handler
 * @returns {Function} wrapped route
 *
 * @example
 * router.get("/users/:id", asyncHandler(async (req, res, next) => {
 *    const user = await User.findById(req.params.id);
 *    res.json(user);
 * }));
 */
const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

export { asyncHandler };
