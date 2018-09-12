var express = require('express');
var router = express.Router();
const { isLogin } = require('../middlewares/isLogin');
const { createCart, allCart} = require('../controllers/cartController');

router.post('/', isLogin, createCart);
router.get('/', isLogin, allCart);

module.exports = router;