const { celebrate, Joi } = require('celebrate');

// validators vor /users route
const createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
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
  loginValidation,
  createPostValidation,
};
