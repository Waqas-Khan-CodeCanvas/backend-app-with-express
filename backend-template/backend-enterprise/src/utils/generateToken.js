import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

// // @desc Generate JWT Token
// // @param {Object} payload
// // @param {string} secret
// // @param {string} expiresIn
export const generateToken = (payload, secret, expiresIn) =>
  jwt.sign(payload, secret, { expiresIn });
