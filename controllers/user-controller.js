const { User } = require('../models')
const {newToken} = require('../helper/access_token')
const {comparePassword} = require('../helper/bcrypt')

class UserController {
  static register(req, res, next){
    let newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    }
    User.findOne({
      where: {
        username: req.body.username
      }
    })
      .then(user => {
        if(user) throw ({name: 'custom', status: 400, msg: 'Username already used'})

        return User.create(newUser)
      })
      .then(data => {
        res.status(201).json({
          id: data.id,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          username: req.body.username,
        })
      })
      .catch(err => {
        next(err)
      })
  }

    static login(req, res, next){
      let username = req.body.username
      let password = req.body.password
  
      User.findOne({
        where: {
          username
        }
      })
      .then(data => {
        if(!data) throw ({name: "custom", msg: "Wrong Username or Password", status: 400})
  
        let compare = comparePassword(password, data.password)
        if(!compare) throw({name: "custom", msg: "Wrong Username or Password", status: 400})
  
        let access_token = newToken({
          id: data.id,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          username: req.body.username,
        })
  
        res.status(200).json({access_token})
      })
      .catch(err => {
        next(err)
      })
    }
}

module.exports = UserController