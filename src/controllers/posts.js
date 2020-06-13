const Post = require('../models/post');
const BadRequestError = require('../errorsModules/BadRequestError');
const NotFoundError = require('../errorsModules/NotFoundError');
const constants = require('../constants');

module.exports.getPosts = (req, res, next) => {
  Post.find({})
    .orFail(new NotFoundError(constants.errors.NO_DOC))
    .then((posts) => res.send(posts))
    .catch(next);
};

module.exports.createPost = (req, res, next) => {
  const { userName, text, date } = req.body;

  Post.create({
    userName,
    text,
    date,
  })
    .then((post) => res.send(post))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};
