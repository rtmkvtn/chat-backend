const router = require('express').Router();
const loginRouter = require('./login');
const postsRouter = require('./posts');
const auth = require('../middlewares/auth');

router.use('/', loginRouter);
router.use('/', auth);
router.use('/', postsRouter);

module.exports = router;
