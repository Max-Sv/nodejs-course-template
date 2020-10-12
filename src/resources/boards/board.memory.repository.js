const DB = require('../../utils/inMemoryDB');
// const NOT_FOUND_ERROR = require('../../errors/appError');
const TABLE_NAME = 'Boards';
const Board = require('./board.model');

const getAll = async () => {
  return await DB.getAllEntities(TABLE_NAME);
};
const get = async id => {
  const board = await DB.getEntity(TABLE_NAME, id);
  if (!board) {
    throw new Error('error');
  }
  return board;
};
const remove = async id => {
  const board = await DB.removeEntity(TABLE_NAME, id);
  if (!board) {
    throw new Error('error');
  }
  return board;
};
const save = async board => {
  const newBoard = await DB.saveEntity(TABLE_NAME, new Board(board));
  if (!newBoard) {
    throw new Error('error');
  }
  return newBoard;
};
const update = async (id, board) => {
  const entity = await DB.updateEntity(TABLE_NAME, id, board);
  if (!entity) {
    throw new Error('error');
  }
  return entity;
};

module.exports = { getAll, update, save, remove, get };
