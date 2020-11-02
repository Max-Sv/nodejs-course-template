const CustomError = require('../../common/customError');
const { User } = require('./user.model');
const { Task } = require('../tasks/task.model');
const ENTITY_NAME = 'user';

const getAll = async () => User.find({});
const get = async id => {
  const user = await User.findById(id);
  if (!user) {
    throw new CustomError({
      message: `${ENTITY_NAME}: id-${id} not found`
    });
  }
  return user;
};
const remove = async id => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new CustomError({
      message: `${ENTITY_NAME}: id-${id} not found`
    });
  }
  await Task.updateMany({ userId: id }, { userId: null });
  return user;
};
const save = async user => User.create(user);
const update = async (id, user) => {
  const updatedUser = await User.findByIdAndUpdate(id, user);
  if (!updatedUser) {
    throw new CustomError({
      message: `${ENTITY_NAME}: id-${id} not found`
    });
  }
  return updatedUser;
};

module.exports = { getAll, get, remove, save, update };
