export class ApiError extends Error {
  /**
   * @param {number} statusCode - HTTP status code
   * @param {string} message - Error message
   * @param {boolean} isOperational - True if error is operational (safe for client)
   */
  constructor(statusCode = 500, message, isOperational = true) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Optional: add custom error code if needed
    // this.code = code || null;

    Error.captureStackTrace(this, this.constructor);
  }
}
