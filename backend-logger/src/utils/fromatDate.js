

// // @desc - converte raw date  into ISO fromate
// // @param (Date || string || Numbers) - String , new Data , Numbers
// // @return ISO formate Date string
// // @useCase const createdAt = formateDate(new Date()) 

// import { logger } from "../config/logger.js";

// export const formatDate = (date) => {
//     const d = new Date(date);

//     if (Number.isNaN(d.getTime())) {
//         const error = new TypeError("Invalid date provided to formatDate")
//         logger.error(error , "Date formatting failed" );
//         return null;
//     }

//     return d.toISOString();
// };





import { logger } from "../config/logger.js";

/**
 * Convert a raw date into ISO format string
 * @param {Date | string | number} date - Date input (Date object, string, or timestamp)
 * @returns {string | null} - ISO formatted date string or null if invalid
 * @example
 * const createdAt = formatDate(new Date());
 */
export const formatDate = (date) => {
  const d = new Date(date);

  if (Number.isNaN(d.getTime())) {
    const error = new TypeError("Invalid date provided to formatDate");
    logger.error({ err: error, input: date }, "Date formatting failed");
    return null;
  }

  return d.toISOString();
};
