import { apiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import { User } from "../models/user.model.js";

const protect = async (req, _, next) => {
    try {
        if (!ENV.JWT_ACCESS_TOKEN_SECRET_KEY) {
            throw new Error("JWT secret key not configured");
        }

        const authHeader = req.headers.authorization;

        const token =
            req.cookies?.accessToken ||
            (authHeader?.startsWith("Bearer ")
                ? authHeader.split(" ")[1]
                : null);

        if (!token) {
            return next(new apiError(401, "Access token not provided"));
        }

        const decoded = jwt.verify(
            token,
            ENV.JWT_ACCESS_TOKEN_SECRET_KEY,
            { algorithms: ["HS256"] }
        );

        const user = await User.findById(decoded._id)
            .select("-password -refreshToken");

        if (!user) {
            return next(new apiError(401, "Invalid access token"));
        }

        req.user = user;
        return next();

    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return next(new apiError(401, "Access token expired"));
        }

        return next(new apiError(401, "Invalid access token"));
    }
};

export { protect };















// Refresh Access Token
// export const refreshAccessToken = asyncHandler(async (req, res) => {
//     const refreshToken = req.cookies?.refreshToken;
//     if (!refreshToken) throw new ApiError(401, "Unauthorized");

//     // Verify refresh token
//     let decoded;
//     try {
//         decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
//     } catch {
//         throw new ApiError(401, "Invalid refresh token");
//     }

//     const user = await User.findById(decoded._id);
//     if (!user || user.refreshToken !== refreshToken) {
//         throw new ApiError(401, "Unauthorized");
//     }

//     // Issue new access token
//     const newAccessToken = jwt.sign(
//         { _id: user._id, role: user.role },
//         process.env.ACCESS_TOKEN_SECRET,
//         { expiresIn: "15m" }
//     );

//     // Optional: rotate refresh token
//     const newRefreshToken = jwt.sign(
//         { _id: user._id },
//         process.env.REFRESH_TOKEN_SECRET,
//         { expiresIn: "7d" }
//     );
//     user.refreshToken = newRefreshToken;
//     await user.save();

//     res.cookie("accessToken", newAccessToken, {
//         httpOnly: true,
//         secure: true,
//         sameSite: "Strict",
//         maxAge: 15 * 60 * 1000, // 15 minutes
//     });
//     res.cookie("refreshToken", newRefreshToken, {
//         httpOnly: true,
//         secure: true,
//         sameSite: "Strict",
//         maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//     });

//     res.json({ accessToken: newAccessToken });
// });
