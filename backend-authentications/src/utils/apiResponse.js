class ApiResponse {
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export { ApiResponse }





// /**
//  * @desc Standardized API response helper
//  */
// class ApiResponse {
//   /**
//    * @param {Object} options
//    * @param {boolean} options.success - true if request succeeded
//    * @param {string} options.message - descriptive message
//    * @param {any} [options.data=null] - optional response data
//    * @param {Array} [options.errors=[]] - optional array of error details
//    */
//   constructor({ success, message, data = null, errors = [] }) {
//     this.success = success;
//     this.message = message;
//     this.data = data;
//     this.errors = errors;
//   }

//   /**
//    * @desc Success response
//    * @param {string} message
//    * @param {any} data
//    * @returns {ApiResponse}
//    */
//   static success(message = "Request successful", data = null) {
//     return new ApiResponse({ success: true, message, data });
//   }

//   /**
//    * @desc Failure response
//    * @param {string} message
//    * @param {Array} errors
//    * @param {any} data
//    * @returns {ApiResponse}
//    */
//   static fail(message = "Request failed", errors = [], data = null) {
//     return new ApiResponse({ success: false, message, errors, data });
//   }
// }

// export { ApiResponse };
