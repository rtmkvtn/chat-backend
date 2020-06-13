const router = require('express').Router();
const { createPost, getPosts } = require('../controllers/posts');
const { createPostValidation } = require('../middlewares/validation');

router.post('/posts', createPostValidation, createPost);
router.get('/posts', getPosts);

module.exports = router;
