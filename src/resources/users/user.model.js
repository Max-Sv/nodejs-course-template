const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const User = new Schema(
  {
    name: String,
    login: String,
    password: String
  },
  { collection: 'users' }
);
User.pre('save', hashPassword);
function hashPassword(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);
      user.password = hash;
      next();
    });
  });
}
const toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};
module.exports = {
  User: mongoose.model('users', User),
  toResponse
};
// class _User {
//   constructor({
//     id = uuid(),
//     name = 'USER',
//     login = 'user',
//     password = 'P@55w0rd'
//   } = {}) {
//     this.id = id;
//     this.name = name;
//     this.login = login;
//     this.password = password;
//   }

//   static toResponse(user) {
//     const { id, name, login } = user;
//     return { id, name, login };
//   }
// }
