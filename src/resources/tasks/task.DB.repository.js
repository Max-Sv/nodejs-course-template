const NotFoundError = require('../../common/notFoundError');
const { Task } = require('./task.model');

const getAll = async boardId => Task.find({ boardId });
const get = async id => {
  const task = await Task.findById(id);
  if (!task) {
    throw new NotFoundError();
  }
  return task;
};
const remove = async id => {
  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    throw new NotFoundError();
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
    throw new NotFoundError();
  }
  return updatedTask;
};

module.exports = { getAll, get, remove, save, update };
