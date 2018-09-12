var express = require('express');
var router = express.Router();
const { login, register, loginFacebook } = require('../controllers/userController')

router.post('/login', login);
router.post('/register', register);
router.post('/loginfacebook', loginFacebook);

module.exports = router;
