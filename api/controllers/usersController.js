const {addUser, getUserByEmail, filterUserData, validatePassword} = require('../services/userService');

const INVALID_LOGIN_MSG = "Wrong email or password";

const sendResponse = (res, status, data) => {
    return res.status(status).json(data);
};

const register = async (req, res, next) => {

    const {name, email, password} = req.body;
    const userData = await addUser(name, email, password);

     return res.status(200).json(userData);
};

const login = async (req, res, next) => {

    const {email, password} = req.body;
    const user = await getUserByEmail(email);

    if (!user || (!await validatePassword(password, user.password))) {
        return res.status(422).json({message: "wrong email or password"});
    }

    return res.status(200).json(filterUserData(user));
}

const logout = async (req, res, next) => {
    //
}

const update = async (req, res, next) => {
    //
}

module.exports = {register, login, logout, update};
