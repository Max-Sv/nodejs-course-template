const uuid = require('uuid');

class Column {
  constructor({ id = uuid(), title = 'column', order = 1 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  // static toResponse(board) {
  //   const { id, title, columns } = board;
  //   return { id, title, columns };
  // }
  // static fromRequest(board) {
  //   const { id, title, columns } = board;
  //   return { id, title, columns };
  // }
}

module.exports = Column;
