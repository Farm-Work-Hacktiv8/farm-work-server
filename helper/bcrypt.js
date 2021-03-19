let bcrypt = require('bcryptjs');

function hashPassword(password){
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  return hash
}

function comparePassword(password, hashPass){
  return bcrypt.compareSync(password, hashPass); //true or false
}

module.exports = { hashPassword, comparePassword }