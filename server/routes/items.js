var express = require('express');
var router = express.Router();
const { isLogin } = require('../middlewares/isLogin');
const { createItem, deleteItem, editItem, allItem, categoryItem, searchItem } = require('../controllers/itemController');

router.get('/', allItem);
router.get('/search/:name', searchItem);
router.get('/:category', categoryItem);
router.post('/create', isLogin, createItem);
router.delete('/delete/:id', isLogin, deleteItem);
router.put('/edit/:id', isLogin, editItem);


module.exports = router;