const express = require('express');
const userController = require('../controllers/userController');


const router = express.Router();

router.get('/', userController.user_index);
router.post('/signup', userController.user_create);
router.post('/login', userController.user_login);
router.delete('/:id', userController.user_delete);

module.exports = router;