import * as winston from 'winston';
import config from 'config';

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
      transports: [new transports.Console()],
      defaultMeta: {
        service: '2024-spring-express',
      },
    });
  }

  debug = (msg) => {
    this.log.debug(msg);
  };

  info = (msg) => {
    this.log.info(msg);
  };

  warn = (msg) => {
    this.log.warn(msg);
  };

  error = (msg) => {
    this.log.error(msg);
  };
}

const logger = new Logger();
export default logger;
