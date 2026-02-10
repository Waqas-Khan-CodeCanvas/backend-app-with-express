import winston from "winston";

const { format, createLogger, transports } = winston;
const { timestamp, errors, colorize, combine } = format;

const customColors = {
    error: "red",
    warn: "yellow",
    info: "green",
  };

winston.addColors(customColors);

const logger = createLogger({
  level: "info",
  format: combine(
    timestamp(),
    colorize(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}] : ${message}`;
    }),
    // format.simple()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "combined.log" }),
    new transports.File({ filename: "error.log", level: "error" }),
  ],
});

export { logger };
