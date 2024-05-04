const { TokenExpiredError } = require('jsonwebtoken');
const { ERRORS } = require('../errors');
const { verifyJwt } = require('../auth');
const User = require("../models/user");
const Admin = require("../models/admin");

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }

    let payload;
    try {
        payload = verifyJwt(token);
    } catch (e) {
        if (e instanceof TokenExpiredError) {
            return res.status(401).send({ error: ERRORS.TOKEN_EXPIRED });
        }
        return res.status(401).send({ error: ERRORS.BAD_TOKEN });
    }

    const user = await User.findById(payload.userId) || await Admin.findById(payload.userId);
    if (!user) {
        return res.status(401).send({ error: ERRORS.USER_NOT_FOUND });
    }
    res.locals.userId = user._id;
    next();
};

module.exports = authMiddleware;