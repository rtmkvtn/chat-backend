const { celebrate, Joi } = require('celebrate');

// validators vor login
const createUserValidation = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required().min(4),
    userName: Joi.string().required().min(2).max(20),
  }),
});

const signinValidation = celebrate({
  body: Joi.object().keys({
    userName: Joi.string().required().min(2).max(20),
    password: Joi.string().required().min(4),
  }),
});

// validators for /posts route
const createPostValidation = celebrate({
  body: Joi.object().keys({
    userName: Joi.string().required().min(1),
    text: Joi.string().required().min(2).max(200),
  }),
});

module.exports = {
  createUserValidation,
  signinValidation,
  createPostValidation,
};
