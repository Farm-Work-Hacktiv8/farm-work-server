const bcrypt = require('bcryptjs')

function hashPassword(userPassword) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(userPassword, salt);
    return hash
}

function comparePassword(userPassword, dbPassword) {
    return bcrypt.compareSync(userPassword, dbPassword)
}

module.exports = { hashPassword, comparePassword }