const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);
const get = id => tasksRepo.get(id);
const remove = id => tasksRepo.remove(id);
const save = task => tasksRepo.save(task);
const update = (id, task) => tasksRepo.update(id, task);

module.exports = { getAll, get, remove, save, update };
