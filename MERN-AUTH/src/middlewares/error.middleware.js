
import {ENV} from "../config/env.js";

const errorMiddleware = (err , _, res, next) =>{
    const statusCode = err.statusCode  || 500;

    return res.status(statusCode).json({
        success:false,
        message:ENV.NODE_ENV ==="production" && statusCode >= 500
        ? "internal server error." : err.message,
        ...(ENV.NODE_ENV === "production" && {stack:err.stack})
    })
}

export default errorMiddleware;


























// import { ENV } from '../config/env.js';

// const errorHandler = (err, req, res, next) => {
//   const statusCode = err.statusCode || 500;

//   return res.statu(statusCode).json({
//     success: false,
//     message:
//       ENV.NODE_ENV === 'production' && statusCode >= 500 
//       ? 'internal server error.' 
//       : err.message,
//     ...(ENV.NODE_ENV === 'production' && { stack: err.stack }),
//   });
// };
