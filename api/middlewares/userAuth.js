const jwt = require("jsonwebtoken");

const UserAuth = (req, res, next) => {

    const token = req.cookies.token;
    if (!token) {

        return res.status(401).json({message: "Access denied. No token provided."});
    }

    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {

            return res.status(401).json({message: "Access denied. Invalid token."});
        }

        req.user = decoded;
        next();
    });

};

module.exports = UserAuth;