const { createLogger, format, transports } = require('winston');
const formatter = format.combine(
  format.colorize(),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.splat(),
  format.printf(res => {
    const { timestamp, level, message } = res;
    return `${timestamp} [${level}]: ${message}`;
  })
);
const transportFileError = new transports.File({
  level: 'error',
  filename: `${__dirname}/../logs/error.log`,
  handleExceptions: true,
  json: true,
  maxFiles: 1
});
const transportFileInfo = new transports.File({
  level: 'info',
  filename: `${__dirname}/../logs/info.log`,
  handleExceptions: true,
  json: true,
  maxFiles: 1
});
const transportConsole = new transports.Console({
  level: 'debug',
  handleExceptions: true,
  json: false
});
const logger = createLogger({
  transports: [transportFileError, transportFileInfo, transportConsole],
  format: formatter,
  exitOnError: false
});
const infoLogger = req => {
  logger.info(
    `method = ${JSON.stringify(req.method)} url = ${JSON.stringify(
      req.originalUrl
    )} body = ${JSON.stringify(req.body)} query = ${JSON.stringify(req.query)}`
  );
};

const errorLogger = error => {
  logger.error(error);
};

module.exports = { infoLogger, errorLogger };
