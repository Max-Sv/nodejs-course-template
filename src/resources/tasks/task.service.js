const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);
const get = (boardId, id) => tasksRepo.get(boardId, id);
const remove = (boardId, id) => tasksRepo.remove(boardId, id);
const save = (boardId, task) => tasksRepo.save(boardId, task);
const update = (boardId, id, task) => tasksRepo.update(boardId, id, task);

module.exports = { getAll, get, remove, save, update };
