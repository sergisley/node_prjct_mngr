const {check, validationResult, body} = require('express-validator');
const db = require('../models/index');
const User = db.User;

const validateUserRegistration = [
    check('name')
        .trim()
        .escape()
        .notEmpty()
        .withMessage('name can not be empty!')
        .bail()
        .isLength({min: 3})
        .withMessage('name should have at least 3 characters!')
        .bail(),
    check('email')
        .trim()
        .normalizeEmail()
        .notEmpty()
        .withMessage('Email address can not be empty!')
        .isEmail()
        .withMessage('Invalid email address!')
        .custom(async (value, {req}) => {
            const user = await User.findOne({where: {email: value}});
            if (user) {

                return Promise.reject('E-mail already in use');
            }
        })
        .bail(),
    check('confirmPassword')
        .trim()
        .notEmpty()
        .withMessage('Confirm password can not be empty!')
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match password');
            }

            return true;
        })
        .withMessage('Passwords and confirmPassword do not match!')
        .bail(),
    check('password')
        .trim()
        .notEmpty()
        .withMessage('Password can not be empty!')
        .isLength({min: 8})
        .withMessage('Password should have at least 8 characters!')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/)
        .withMessage('Password should have at least one uppercase letter, one lowercase letter and one number!')
        .bail(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        next();
    },
];

const validateUserLogin = [
    check('email')
        .trim()
        .normalizeEmail()
        .notEmpty()
        .withMessage('Email address can not be empty!')
        .isEmail()
        .withMessage('Invalid email address!')
        .bail(),
    check('password')
        .trim()
        .notEmpty()
        .withMessage('Password can not be empty!')
        .bail(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        next();
    },
];


const validateUserUpdate = [
    body('name').if(body('name').exists())
        .trim()
        .escape()
        .isLength({min: 3})
        .withMessage('name should have at least 3 characters!'),
    body('email').if(body('email').exists())
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Invalid email address!')
        .custom(async (value, {req}) => {
            const user = await User.findOne({where: {email: value}});
            if (user) {
                return Promise.reject('E-mail already in use');
            }
        }),
    body('password').if(body('password').exists())
        .trim()
        .isLength({min: 8})
        .withMessage('Password should have at least 8 characters!')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/)
        .withMessage('Password should have at least one uppercase letter, one lowercase letter and one number!'),
    body('confirmPassword').if(body('confirmPassword').exists())
        .trim()
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match password');
            }
            return true;
        })
        .withMessage('Passwords and confirmPassword do not match!'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        next();
    },
];


    module.exports = {validateUserRegistration, validateUserLogin, validateUserUpdate};