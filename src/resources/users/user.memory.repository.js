const DB = require('../../utils/inMemoryDB');
// const NOT_FOUND_ERROR = require('../../errors/appError');
const TABLE_NAME = 'Users';
// const User = require('./user.model');

const getAll = async () => {
  return await DB.getAllEntities(TABLE_NAME);
};
const get = async id => {
  const user = await DB.getEntity(TABLE_NAME, id);
  if (!user) {
    throw new Error('error');
  }
  return user;
};
const remove = async id => {
  if (!(await DB.removeEntity(TABLE_NAME, id))) {
    throw new Error('error');
  }
};
const save = async user => {
  return DB.saveEntity(TABLE_NAME, user);
};
const update = async (id, user) => {
  const entity = await DB.getEntity(TABLE_NAME, id, user);
  if (!entity) {
    throw new Error('error');
  }
  return entity;
};

module.exports = { getAll, get, remove, save, update };
