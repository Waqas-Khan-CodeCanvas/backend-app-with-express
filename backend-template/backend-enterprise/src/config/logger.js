import pino from "pino";

// // @desc Logger configuration for development and production
const isProduction = process.env.NODE_ENV === "production";

export const logger = pino({
  level: isProduction ? "error" : "debug",
  transport: !isProduction
    ? {
        target: "pino-pretty",
        options: { colorize: true, translateTime: "HH:MM:ss" },
      }
    : undefined,
});
