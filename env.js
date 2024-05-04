const crypto = require('crypto');

function getJwtSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.log('Missing JWT secret');
        process.exit(1);
    }
    return secret;
}

function hashPassword(password) {
    return crypto
      .pbkdf2Sync(password, process.env.PASSWORD_SALT, 42, 64, 'sha512')
      .toString('hex');
}

module.exports = {
    getJwtSecret,
    hashPassword
};