const router = require('express').Router();
const { createUser, signin } = require('../controllers/users');
const { createUserValidation, signinValidation } = require('../middlewares/validation');

router.post('/signup', createUserValidation, createUser);
router.post('/signin', signinValidation, signin);

module.exports = router;
