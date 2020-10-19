const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');
const { errorLogger } = require('./logging');

const errorHandler = async (err, req, res, next) => {
  if (err) {
    const status = err.status ? err.status : INTERNAL_SERVER_ERROR;
    errorLogger(JSON.stringify({ status, message: getStatusText(status) }));
    res.status(status).end(getStatusText(status));
  }
  next();
};

module.exports = { errorHandler };
