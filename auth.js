const jwt = require('jsonwebtoken');
const { getJwtSecret } = require('./env');

function signJwt(obj) {
    return jwt.sign(obj, getJwtSecret(), {
        expiresIn: '15d'
    });
}

function verifyJwt(token) {
    return jwt.verify(token, getJwtSecret());
}

module.exports = {
    signJwt,
    verifyJwt
};