import winston from 'winston';

const getLogLevel = (): string => {
  return process.env.LOG_LEVEL || 'debug';
};

const customFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

/**
 * Creates a logger instance with configurations specified in the application's config file.
 * Logs are outputted to the console.
 */
const logger = winston.createLogger({
  level: getLogLevel(),
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    customFormat,
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
