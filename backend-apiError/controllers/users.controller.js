import { apiError } from "../utils/apiError.js";

export const getUser = async (req, res, next) => {
  // const {username , useremail, password} = req.body;
  try {
    const user = null;

    if (!user) {
      throw new apiError(404, "user not found here");
    }

    res.status(200).json({
      sucess: true,
      message: "user successfully fetched.",
      data: user,
      meta: {},
    });
  } catch (error) {
    console.log(`Error is : ${error.message}`)
    next(error)
  }
};
