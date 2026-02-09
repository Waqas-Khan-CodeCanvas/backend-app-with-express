// // src/config/logger.js

// import winston from 'winston';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const { createLogger, format, transports } = winston;
// const {combine,timestamp,printf,errors,json,colorize} = format;

// // Fix __dirname for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const env = process.env.NODE_ENV || 'development';
// const isProduction = env === 'production';

// const logDir = path.join(__dirname, '../../logs');

// /**
//  * Development log format (readable)
//  */
// const devFormat = printf(({ level, message, timestamp, stack }) => {
//   return `${timestamp} [${level}]: ${stack || message}`;
// });

// /**
//  * Logger instance
//  */
// const logger = createLogger({
//   level: isProduction ? 'info' : 'debug',
//   format: combine(
//     timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//     errors({ stack: true }),
//     isProduction ? json() : devFormat
//   ),
//   transports: [
//     new transports.Console({
//       format: combine(
//         colorize(),
//         isProduction ? json() : devFormat
//       ),
//     }),
//     new transports.File({
//       filename: path.join(logDir, 'combined.log'),
//     }),
//     new transports.File({
//       filename: path.join(logDir, 'error.log'),
//       level: 'error',
//     }),
//   ],
//   exitOnError: false,
// });

// export  {logger};





// src/config/logger.js

import winston from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';

const { createLogger, format, transports } = winston;
const { combine, timestamp, printf, errors, json, colorize } = format;

// ESM __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';

const logDir = path.join(__dirname, '../../logs');

/**
 * Dev-friendly format (human readable)
 */
const devFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

/**
 * Console format based on environment
 */
const consoleFormat = isProduction
  ? combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      json()
    )
  : combine(
      colorize(),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      devFormat
    );

const logger = createLogger({
  level: isProduction ? 'info' : 'debug',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    json()
  ),
  transports: [
    // Console
    new transports.Console({
      format: consoleFormat,
    }),

    // All logs
    new transports.File({
      filename: path.join(logDir, 'combined.log'),
    }),

    // Errors only
    new transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
    }),
  ],
  exitOnError: false,
});

export  {logger};
