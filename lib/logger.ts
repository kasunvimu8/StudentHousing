import { createLogger, format } from "winston";
import fs from "fs";
import path from "path";
import os from "os";
import DailyRotateFile from "winston-daily-rotate-file";

// const logDir = path.join(process.cwd(), "logs");

// // Ensure the logs directory exists
// if (!fs.existsSync(logDir)) {
//   fs.mkdirSync(logDir);
// }

// // Configure the logger
// const logger = createLogger({
//   level: "info",
//   format: format.combine(
//     format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
//     format.printf(
//       ({ timestamp, level, message }) =>
//         `${timestamp} [${level.toUpperCase()}]: ${message}`
//     )
//   ),
//   transports: [
//     new DailyRotateFile({
//       filename: path.join(logDir, "info-%DATE%.log"),
//       datePattern: "YYYY-MM-DD", // Rotate logs daily
//       maxSize: "50m", // Maximum size of a single log file
//       maxFiles: "90d", // Keep logs for 14 days
//     }),
//     new DailyRotateFile({
//       filename: path.join(logDir, "error-%DATE%.log"), // Separate file for error logs
//       level: "error",
//       datePattern: "YYYY-MM-DD",
//       maxSize: "50m",
//       maxFiles: "90d",
//     }),
//   ],
// });

export default {
  // info: (message: string) => logger.info(message),
  // error: (message: string) => logger.error(message),
  info: (message: string) => console.info(message),
  error: (message: string) => console.error(message),
};
