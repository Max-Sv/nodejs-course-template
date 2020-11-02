const { NOT_FOUND } = require('http-status-codes');

class CustomError extends Error {
  constructor({ status = NOT_FOUND, message }) {
    console.log('message:', message);
    console.log('status:', status);
    super(message);
    this.status = status;
  }
}
module.exports = CustomError;
