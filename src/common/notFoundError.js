const { NOT_FOUND } = require('http-status-codes');

class NotFoundError extends Error {
  constructor() {
    super();
    this.status = NOT_FOUND;
  }
}
module.exports = NotFoundError;
