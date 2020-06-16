const Post = require('../models/post');
const BadRequestError = require('../errorsModules/BadRequestError');

module.exports.getPosts = (req, res, next) => {
  const pagination = req.query.pagination ? parseInt(req.query.pagination, 10) : 5;
  const page = req.query.page ? parseInt(req.query.page, 10) : 1;

  Post.find({})
    .skip((page - 1) * pagination)
    .limit(pagination)
    .populate('owner')
    .then((posts) => res.send(posts))
    .catch(next);
};

module.exports.createPost = (req, res, next) => {
  const { text, date } = req.body;

  Post.create({
    owner: req.user._id,
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
