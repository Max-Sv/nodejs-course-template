// const DB = require('../../utils/inMemoryDB');
// const NotFoundError = require('../../common/notFoundError');
// const TABLE_NAME = 'Users';
// const User = require('./user.model');

// const getAll = async () => {
//   return await DB.getAllEntities(TABLE_NAME);
// };
// const get = async id => {
//   const user = await DB.getEntity(TABLE_NAME, id);
//   if (!user) {
//     throw new NotFoundError();
//   }
//   return user;
// };
// const remove = async id => {
//   const user = await DB.removeEntity(TABLE_NAME, id);
//   if (!user) {
//     throw new NotFoundError();
//   }
//   return user;
// };
// const save = async user => {
//   const newUser = await DB.saveEntity(TABLE_NAME, new User(user));
//   if (!newUser) {
//     throw new NotFoundError();
//   }
//   return newUser;
// };
// const update = async (id, user) => {
//   const entity = await DB.updateEntity(TABLE_NAME, id, user);
//   if (!entity) {
//     throw new NotFoundError();
//   }
//   return entity;
// };

// module.exports = { getAll, get, remove, save, update };
