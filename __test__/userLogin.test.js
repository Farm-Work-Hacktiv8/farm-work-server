const request = require('supertest');
const app = require("../app")
const {sequelize, User} = require('../models')

const user = {
  firstName: 'Wahyu',
  lastName: 'Danang',
  email: 'danang123100@gmail.com',
  username: 'wahyudanang100',
  password: '123456'
}

beforeAll((done)=> {
  User.create(user)
  .then(data => {
    done()
  })
  .catch( err => {
      console.log(err);
  })
})

afterAll((done) => {
  User.destroy({where: {} })
    .then(() => {
      sequelize.close()
      done()
    })
    .catch(err => {
      console.log(err);
    })
})

//===================== success test LOGIN ========================================
describe('POST /login', function() {
  it('user login return status 200 and access_token', function(done) {
    let body = {
        username: "wahyudanang100",
        password: "123456",
    };

    request(app)
    .post('/login')
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(200)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('access_token')
      done()
    });
  });
});

//===================== error test LOGIN ========================================

//===================== error test wrong password  ==========================
describe('POST /login', function() {
  it('wrong password return status 400 and error msg', function(done) {
    let body = {
      username: "wahyudanang" ,
      password: "passwordnya salah"
    }

    request(app)
    .post('/login')
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toEqual('Wrong Username or Password')
      done()
    });
  });
});

//===================== error test wrong username  ==========================
describe('POST /login', function() {
  it('wrong username return status 400 and error msg', function(done) {
    let body = {
      username: "username nya salah" ,
      password: "123456"
    }

    request(app)
    .post('/login')
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toEqual('Wrong Username or Password')
      done()
    });
  });
});

//===================== error test no username n pass  =========================
describe('POST /login', function() {
  it('no username n pass return status 400 and error msg', function(done) {
    let body = {
      username: "" ,
      password: ""
    }

    request(app)
    .post('/login')
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toEqual('Wrong Username or Password')
      done()
    });
  });
});