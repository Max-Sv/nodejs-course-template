const CustomError = require('../../common/customError');
const { Board } = require('./board.model');
const { Task } = require('../tasks/task.model');
const ENTITY_NAME = 'board';
const getAll = async () => Board.find({});

const get = async id => {
  const board = await Board.findById(id);
  if (!board) {
    throw new CustomError({
      message: `${ENTITY_NAME}: id-${id} not found`
    });
  }
  return board;
};

const remove = async id => {
  const board = await Board.findByIdAndDelete(id);
  if (!board) {
    throw new CustomError({
      message: `${ENTITY_NAME}: id-${id} not found`
    });
  }
  await Task.deleteMany({ boardId: id });
  return board;
};

const save = async board => Board.create(board);

const update = async (id, board) => {
  const updatedBoard = await Board.findByIdAndUpdate(id, board);
  if (!updatedBoard) {
    throw new CustomError({
      message: `${ENTITY_NAME}: id-${id} not found`
    });
  }
  return updatedBoard;
};

module.exports = { getAll, get, remove, save, update };
