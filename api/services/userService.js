const InvalidDataError = require('../errors/InvalidDataError');
const bcrypt = require('bcrypt');
const {Logger} = require('./loggerService');
const db = require('../models/index');
const jwt = require("jsonwebtoken");
const User = db.User;

const addUser = async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
    const user = await User.create({name: name, email: email, password: hashedPassword});

    return filterUserData(user);
}

const filterUserData = (user) => {
    const {id, password, ...userData} = user.dataValues;
    return userData;
}

const authenticateUser = async (email, password) => {

    const user = await User.findOne({where: {email: email}});

    if (!user || (!await validatePassword(password, user.password))) {
        throw new InvalidDataError('Wrong email or password');
    }

    const token = generateToken(user.email);

    return {
        user: filterUserData(user),
        token: token
    };
}

const validatePassword = async (password, hash) => {

    return await bcrypt.compare(password, hash);
}

const generateToken = (email) => {

    return jwt.sign(
        {email},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_TOKEN_TTL}
    );
}

const updateUser = async (validatedEmail, name, email, password,confirmPassword) => {

    const user = await User.findOne({where: {email: validatedEmail}});

    if (!user) {
        throw new InvalidDataError('User not found');
    }

    if(password && (password !== confirmPassword)){
        throw new InvalidDataError('Passwords do not match');
    }

    if (password) {
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
        user.update({password: hashedPassword})
    }

    if (name) {
        user.update({name: name})
    }

    let token = null;

    if (email) {
        user.update({email: email})
        token = generateToken(email);
    }

    await user.save();

    return {
        user: filterUserData(user),
        token: token
    };

}

module.exports = {addUser, authenticateUser, updateUser};

