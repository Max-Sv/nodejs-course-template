const DB = require('../../utils/inMemoryDB');
// const NOT_FOUND_ERROR = require('../../errors/appError');
const TABLE_NAME = 'Tasks';

// const Task = require('./task.model');
const getAll = async borderId => {
  const tasks = await DB.getAllEntities(TABLE_NAME);
  return tasks.filter(task => task.boardId === borderId);
};
const get = async id => {
  const task = await DB.getEntity(TABLE_NAME, id);
  if (!task) {
    // throw new NOT_FOUND_ERROR('us not found id');
  }
  return task;
};
const remove = async id => {
  if (!(await DB.removeEntity(TABLE_NAME, id))) {
    // throw new NOT_FOUND_ERROR('us not found id');
  }
};
const save = async task => {
  return DB.saveEntity(TABLE_NAME, task);
};
const update = async (id, task) => {
  const entity = await DB.getEntity(TABLE_NAME, id, task);
  if (!entity) {
    // throw new NOT_FOUND_ERROR('us not found id');
  }
  return entity;
};

module.exports = { getAll, update, save, remove, get };
