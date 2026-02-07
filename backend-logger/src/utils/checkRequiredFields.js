import { logger } from "../config/logger.js";

/**
 * Check required fields of a client request
 * @param {Object} fields - key-value pairs from request body
 * @returns {string[]} - array of invalid field names (null, undefined, empty, or whitespace-only)
 */
export const checkRequiredFields = (fields) => {
  if (typeof fields !== "object" || fields === null || Array.isArray(fields)) {
    logger.warn("checkRequiredFields function expects a non-null object.");
    return [];
  }

  return Object.entries(fields)
    .filter(([_, value]) => value === null || value === undefined || (typeof value === "string" && value.trim() === ""))
    .map(([key]) => key);
};
