const {verifyToken} = require('../helper/access_token')
const {User} = require('../models')

let authenticate = (req, res, next) => {
  try {
    let access_token = req.headers.access_token
    let decode = verifyToken(access_token)

    User.findOne({
      where: {
        id: decode.id
      }
    })
    .then(data => {

      if(!data) throw({name: 'custom', msg: 'Please login first.', status: 403})
      req.dataUser = decode
      next()
    })
    .catch(err => {
      next(err)
    })

  } catch {
    let err = {name: 'custom', msg: 'Please login first.', status: 403}
    next(err)
  }
}

module.exports = authenticate