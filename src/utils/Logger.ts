import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.printf(({ timestamp, level, message, stack }) => {
      const msg = `${timestamp} [${level.toUpperCase()}]: ${message}`;
      return stack ? `${msg}\n${stack}` : msg;
    }),
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
    new transports.File({
      filename: "test-results/logs/test-run.log",
      maxsize: 5242880,
      maxFiles: 5,
    }),
  ],
});

export { logger };
