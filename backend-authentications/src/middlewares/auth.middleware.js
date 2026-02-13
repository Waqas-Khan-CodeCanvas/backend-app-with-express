export const verifyJWT = asyncHandler(async (req, _, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
        throw new ApiError(401, "Unauthorized");
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            throw new ApiError(401, "Access token expired");
        }
        throw new ApiError(401, "Invalid access token");
    }

    const user = await User.findById(decodedToken._id).select("-password -refreshToken");
    if (!user) {
        throw new ApiError(401, "Unauthorized");
    }

    req.user = user;
    next();
});





















import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

// Verify Access Token
export const verifyJWT = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) throw new ApiError(401, "Unauthorized");

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded._id).select("-password -refreshToken");
        if (!user) throw new ApiError(401, "Unauthorized");

        req.user = user;
        next();
    } catch (err) {
        // Token expired → trigger refresh
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Access token expired", code: "TOKEN_EXPIRED" });
        }
        throw new ApiError(401, "Invalid access token");
    }
});

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
