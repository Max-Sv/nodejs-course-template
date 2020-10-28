const NotFoundError = require('../../common/notFoundError');
const { Board } = require('./board.model');
const { Task } = require('../tasks/task.model');
const getAll = async () => Board.find({});

const get = async id => {
  const board = await Board.findById(id);
  if (!board) {
    throw new NotFoundError();
  }
  return board;
};

const remove = async id => {
  const board = await Board.findByIdAndDelete(id);
  if (!board) {
    throw new NotFoundError();
  }
  await Task.deleteMany({ boardId: id });
  return board;
};

const save = async board => Board.create(board);

const update = async (id, board) => {
  const updatedBoard = await Board.findByIdAndUpdate(id, board);
  if (!updatedBoard) {
    throw new NotFoundError();
  }
  return updatedBoard;
};

module.exports = { getAll, get, remove, save, update };
