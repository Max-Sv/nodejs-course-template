const tasksRepo = require('./task.DB.repository');

const getAll = boardId => tasksRepo.getAll(boardId);
const get = id => tasksRepo.get(id);
const remove = id => tasksRepo.remove(id);
const save = (boardId, task) => tasksRepo.save(boardId, task);
const update = (boardId, id, task) => tasksRepo.update(boardId, id, task);

module.exports = { getAll, get, remove, save, update };
