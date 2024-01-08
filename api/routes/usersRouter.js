const express = require('express');
const router = express.Router();
const {register, login, logout, update} = require('../controllers/usersController');
const {validateUserRegistration, validateUserLogin, validateUserUpdate} = require('../middlewares/userValidators');
const UserAuth = require('../middlewares/userAuth');


router.put('/', validateUserRegistration, register);

router.post('/', UserAuth, update);

router.post('/login/', validateUserLogin, login);

router.post('/logout/', UserAuth,validateUserUpdate, logout);

module.exports = router;
