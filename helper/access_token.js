let jwt = require("jsonwebtoken");

function newToken(payload) {
    return jwt.sign(payload, process.env.SECRET);
}

function verifyToken(token) {
    return jwt.verify(token, process.env.SECRET);
}

module.exports = { newToken, verifyToken };
