// @desc Custom API Error class for structured error handling

class ApiError extends Error {

  //   @param {number} statusCode - HTTP status code
  //   @param {string} message - error message
  //   @param {Array} errors - optional array of detailed errors

  constructor(statusCode = 500, message = "Internal Server Error", errors = []) {
    super(message);

    this.name = this.constructor.name; // ApiError
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors; // optional details
    this.success = false;
    this.data = null;

    // capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

export { ApiError };
