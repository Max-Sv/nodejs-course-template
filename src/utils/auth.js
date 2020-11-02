const CustomError = require('../common/customError');
const { UNAUTHORIZED } = require('http-status-codes');
const { JWT_SECRET_KEY } = require('../common/config');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const [type, token] = req.headers.authorization.split(' ');
    if (type !== 'Bearer') throw Error;
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded;
    return next();
  } catch (err) {
    throw new CustomError({
      status: UNAUTHORIZED,
      message: 'Authorization error'
    });
  }
};

module.exports = auth;
