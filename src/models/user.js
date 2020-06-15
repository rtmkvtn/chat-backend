const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    select: false,
  },
});

// finding user on login route
userSchema.statics.findUserByCredentials = function (userName, password) {
  return this.findOne({ userName })
    .select('+password')
    .then((user) => {
      if (!user) {
        return false;
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return false;
        }
        return user;
      });
    });
};

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema);
