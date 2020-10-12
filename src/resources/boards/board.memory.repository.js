const DB = require('../../utils/inMemoryDB');
// const NOT_FOUND_ERROR = require('../../errors/appError');
const TABLE_NAME = 'Boards';

// const Board = require('./board.model');
const getAll = async () => {
  return await DB.getAllEntities(TABLE_NAME);
};
const get = async id => {
  const board = await DB.getEntity(TABLE_NAME, id);
  if (!board) {
    // throw new NOT_FOUND_ERROR('us not found id');
  }
  return board;
};
const remove = async id => {
  if (!(await DB.removeEntity(TABLE_NAME, id))) {
    // throw new NOT_FOUND_ERROR('us not found id');
  }
};
const save = async board => {
  return DB.saveEntity(TABLE_NAME, board);
};
const update = async (id, board) => {
  const entity = await DB.getEntity(TABLE_NAME, id, board);
  if (!entity) {
    // throw new NOT_FOUND_ERROR('us not found id');
  }
  return entity;
};

module.exports = { getAll, update, save, remove, get };
