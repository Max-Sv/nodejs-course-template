const uuid = require('uuid');

class Column {
  constructor({ id = uuid(), title = 'column', order = 1 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = Column;
