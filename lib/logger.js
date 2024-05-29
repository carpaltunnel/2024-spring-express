import * as winston from 'winston';
import config from 'config';
import DailyRotateFile from 'winston-daily-rotate-file';

const { format, createLogger, transports } = winston.default;
const { label: label, timestamp: timestamp, combine: combine, errors: errors, json: json, printf: printf } = format;

class Logger {
  log = null;

  constructor() {
    this.log = createLogger({
      level: config.get('logging').level,
      format: combine(
        timestamp(),
        winston.format.json(),
      ),
      transports: [
        new transports.Console(),
        new transports.DailyRotateFile({
          filename: '2024-spring-express-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ],
      defaultMeta: {
        service: '2024-spring-express',
      },
    });
  }

  debug = (msg, tokens) => {
    this.log.debug(msg, tokens);
  };

  info = (msg, tokens) => {
    this.log.info(msg, tokens);
  };

  warn = (msg, tokens) => {
    this.log.warn(msg, tokens);
  };

  error = (msg, tokens) => {
    this.log.error(msg, tokens);
  };
}

const logger = new Logger();
export default logger;
