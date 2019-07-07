const express = require('express');
const userController = require('../controllers/users');

const router = express.Router();

router.get('/', userController.getUsers);
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/:userId', userController.getUserById);
// router.patch('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;
