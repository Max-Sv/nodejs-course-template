const CustomError = require('../../common/customError');
const { Task } = require('./task.model');
const ENTITY_NAME = 'task';
const getAll = async boardId => Task.find({ boardId });
const get = async id => {
  const task = await Task.findById(id);
  if (!task) {
    throw new CustomError({
      message: `${ENTITY_NAME}: id-${id} not found`
    });
  }
  return task;
};
const remove = async id => {
  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    throw new CustomError({
      message: `${ENTITY_NAME}: id-${id} not found`
    });
  }
  return task;
};
const save = async (boardId, task) => {
  task.boardId = boardId;
  return Task.create(task);
};
const update = async (boardId, id, task) => {
  task.id = id;
  task.boardId = boardId;
  const updatedTask = await Task.findByIdAndUpdate(id, task);
  if (!updatedTask) {
    throw new CustomError({
      message: `${ENTITY_NAME}: id-${id} not found`
    });
  }
  return updatedTask;
};

module.exports = { getAll, get, remove, save, update };
