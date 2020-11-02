const { User } = require('../users/user.model');
const bcrypt = require('bcrypt');
const { FORBIDDEN } = require('http-status-codes');
const CustomError = require('../../common/customError');

const validate = async ({ login, password }) => {
  const user = await User.findOne({ login });
  try {
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      return { login: user.login, userId: user._id };
    }
    throw new CustomError({
      status: FORBIDDEN,
      message: 'Invalid login or password'
    });
  } catch (err) {
    throw new CustomError({
      status: FORBIDDEN,
      message: 'Invalid login or password'
    });
  }
};

module.exports = { validate };
