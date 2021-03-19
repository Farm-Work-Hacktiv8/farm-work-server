var jwt = require('jsonwebtoken');
const {User} = require('../models')

let authenticate = (req, res, next) => {
  try {
    let access_token = req.headers.access_token
    let decode = jwt.verify(access_token, process.env.SECRET)

    User.findOne({
      where: {
        id: decode.id
      }
    })
    .then(data => {
      if(!data) throw({name: 'custom', msg: 'Not Authenticate', status: 401})
      req.dataUser = decode
      next()
    })
    .catch(err => {
      next(err)
    })
    
  } catch {
    let err = {name: 'custom', msg: 'Not Authenticate', status: 401}
    next(err)
  }
}

module.exports = authenticate