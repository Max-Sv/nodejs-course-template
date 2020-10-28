const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');
const { errorLogger, logger } = require('./logging');

const errorHandler = async (err, req, res, next) => {
  if (err) {
    const status = err.status ? err.status : INTERNAL_SERVER_ERROR;
    logger.error(err.stack);
    errorLogger(JSON.stringify({ status, message: getStatusText(status) }));
    res.status(status).send(getStatusText(status));
  }
  next();
};

module.exports = { errorHandler };
