const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const escape = require('escape-html');
const User = require('../models/user');
const { JWT_SECRET } = require('../config');
const AuthorizationError = require('../errorsModules/AuthorizationError');
const ConflictError = require('../errorsModules/ConflictError');
const constants = require('../constants');

// avoiding undefined and special symbols in user's input
const noSymbols = (input) => (escape(input) === 'undefined' ? 'error' : escape(input));

module.exports.createUser = (req, res, next) => {
  const { userName, password } = req.body;
  if (noSymbols(userName) === 'error') {
    throw new Error('Inapropriate userName. Please Change it');
  }

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ userName: escape(userName), password: hash }))
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        name: user.userName,
      });
    })
    .catch((err) => {
      if (err.message.includes('unique')) {
        return next(new ConflictError(constants.errors.DUPL_NAME));
      }
      return next(err);
    });
};

module.exports.signin = (req, res, next) => {
  const { userName, password } = req.body;

  return User.findUserByCredentials(userName, password)
    .then((user) => {
      if (!user) {
        throw new AuthorizationError(constants.errors.AUTHORIZATION_ERROR);
      }
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 7 * 24 * 60 * 60000,
          httpOnly: true,
          sameSite: true,
        })
        .send({ token });
    })
    .catch(next);
};
