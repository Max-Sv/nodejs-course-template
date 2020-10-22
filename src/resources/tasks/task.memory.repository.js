const DB = require('../../utils/inMemoryDB');
const NotFoundError = require('../../common/notFoundError');
const TABLE_NAME = 'Tasks';
const Task = require('./task.model');

const getAll = async borderId => {
  const tasks = await DB.getAllEntities(TABLE_NAME);
  return tasks.filter(task => task.boardId === borderId);
};
const get = async (borderId, id) => {
  const task = await DB.getEntity(TABLE_NAME, id);
  if (!task || task.boardId !== borderId) {
    throw new NotFoundError();
  }
  return task;
};
const remove = async (borderId, id) => {
  const task = await DB.removeEntity(TABLE_NAME, id, borderId);
  if (!task) {
    throw new NotFoundError();
  }
  return task;
};
const save = async (boardId, task) => {
  const newTask = await DB.saveEntity(
    TABLE_NAME,
    new Task({ ...task, boardId })
  );
  if (!newTask) {
    throw new NotFoundError();
  }
  return newTask;
};
const update = async (borderId, id, task) => {
  const entity = await DB.updateEntity(TABLE_NAME, id, task, borderId);
  if (!entity) {
    throw new NotFoundError();
  }
  return entity;
};

module.exports = { getAll, update, save, remove, get };
