let jwt = require('jsonwebtoken');

function newToken(payload){
  return jwt.sign(payload, process.env.secretKey);
}

function verifyToken(token){
  return jwt.verify(token, process.env.secretKey);
}

module.exports = { newToken, verifyToken }