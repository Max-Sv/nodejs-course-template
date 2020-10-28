const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Board = new Schema(
  {
    title: String,
    columns: [
      {
        title: String,
        order: Number
      }
    ]
  },
  { collection: 'boards' }
);

const toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

module.exports = {
  Board: mongoose.model('boards', Board),
  toResponse
};

// const uuid = require('uuid');
// const Column = require('./column.model');

// class Board {
//   constructor({ id = uuid(), title = 'board', columns = [] } = {}) {
//     this.id = id;
//     this.title = title;
//     this.columns = columns.map(colunm => new Column(colunm));
//   }
//   static toResponse(board) {
//     const { id, title, columns } = board;
//     return { id, title, columns };
//   }
// }
