// import pino from "pino";

// const isProduction = process.env.NODE_ENV === "production";

// export const logger = pino({
//   level: isProduction ? "error" : "debug",
//   transport: !isProduction
//     ? {
//         target: "pino-pretty",
//         options: {
//           colorize: true,
//           translateTime: "HH:MM:ss",
//         },
//       }
//     : undefined,
// });






// import pino from "pino";

// const isProduction = process.env.NODE_ENV === "production";

// export const logger = pino({
//   level: isProduction ? "error" : "debug",

//   // 🔒 Remove sensitive / noisy fields in prod
//   redact: isProduction
//     ? {
//         paths: ["err.stack", "pid", "hostname"],
//         remove: true,
//       }
//     : undefined,

//   // 🧠 Control error output
//   serializers: {
//     err: (err) => ({
//       type: err?.name,
//       message: err?.message,
//     }),
//   },

//   transport: !isProduction
//     ? {
//         target: "pino-pretty",
//         options: {
//           colorize: true,
//           translateTime: "HH:MM:ss",
//           ignore: "pid,hostname",
//         },
//       }
//     : undefined,
// });








import pino from "pino";

const isProduction = process.env.NODE_ENV === "production";

export const logger = pino({
  // Log level
  level: isProduction ? "error" : "debug",

  // 🔒 Production safety: remove noisy & sensitive fields
  ...(isProduction && {
    redact: {
      paths: ["err.stack", "pid", "hostname"],
      remove: true,
    },

    serializers: {
      err: (err) => ({
        type: err?.name,
        message: err?.message,
      }),
    },
  }),

  // 🧪 Development friendliness
  ...(!isProduction && {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss",
        ignore: "pid,hostname",
        singleLine: false,
      },
    },
  }),
});
