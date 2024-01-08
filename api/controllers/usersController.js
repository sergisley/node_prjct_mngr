const {addUser, authenticateUser, updateUser} = require('../services/userService');

const register = async (req, res, next) => {

    const {name, email, password} = req.body;
    const userData = await addUser(name, email, password);

    return res.status(200).json(userData);
};

const login = async (req, res, next) => {

    const {email, password} = req.body;

    try {
        const {user, token} = await authenticateUser(email, password);
        res.cookie("token", token, {httpOnly: true});

        return res.status(200).json(user);
    } catch (e) {
        if (e.isClientError) {

            return res.status(e.status).json({message: e.message});
        } else {

            next(e);
        }
    }
}

const logout = async (req, res, next) => {

    res.clearCookie("token");

    return res.sendStatus(200);
}

const update = async (req, res, next) => {

    const {name, email, password, confirmPassword} = req.body;

    try {

        const {user, token} = await updateUser(req.user.email, name, email, password, confirmPassword);

        if (token) {
            res.cookie("token", token, {httpOnly: true});
        }

        return res.status(200).json({user});
    } catch (e) {
        if (e.isClientError) {

            return res.status(e.status).json({message: e.message});
        } else {

            next(e);
        }
    }
}

module.exports = {register, login, logout, update};
