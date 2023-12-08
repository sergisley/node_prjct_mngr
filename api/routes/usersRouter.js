const express = require('express');
const router = express.Router();
const {register, login} = require('../controllers/usersController');
const {ValidateUserRegistration,ValidateUserLogin} = require('../middlewares/userValidators');



router.put('/', ValidateUserRegistration,  (req, res, next)=> {
    return register(req, res, next);
});

router.post('/login',ValidateUserLogin,  (req, res, next) =>{
    return login(req, res, next);
});

router.get('/:id',  (req, res, next)=> {
    res.send('user get');
});

router.post('/:id',  (req, res, next) =>{
    res.send('user update');
});

module.exports = router;
