require('dotenv').config();
const bcrypt = require('bcrypt');
const {Logger} = require('./loggerService');
const db = require('../models/index');
const User = db.User;

const addUser = async (name, email, password) => {

    const user = await User.create({
        name: name,
        email: email,
        password: await bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS))
    });

    return filterUserData(user);
}

const filterUserData = (user) => {
    delete user.dataValues.id;
    delete user.dataValues.password;

    return user;
}

const getUserByEmail = async (email) => {

    return await User.findOne({where: {email: email}});
}

const validatePassword = async (password, hash) => {

    return await bcrypt.compare(password, hash);
}

const generateToken = () => {

}

const deleteToken = () => {

}

module.exports = {addUser, getUserByEmail, filterUserData, validatePassword};

