const request = require('supertest');
const app = require("../app")
const {sequelize} = require('../models')

afterAll((done) => {
  sequelize.close()
  done()
})

//===================== success test LOGIN ========================================
describe('POST /users/login', function() {
  it('user login return status 200 and access_token', function(done) {
    let body = {
      username: "budi1234" ,
      password: "1234"
    }

    request(app)
    .post('/users/login')
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
describe('POST /users/login', function() {
  it('return status 400 and error msg', function(done) {
    let body = {
      username: "budi1234" ,
      password: "passwordnya salah"
    }

    request(app)
    .post('/users/login')
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toHaveProperty('Wrong Username or Password')
      done()
    });
  });
});

//===================== error test wrong username  ==========================
describe('POST /users/login', function() {
  it('return status 400 and error msg', function(done) {
    let body = {
      username: "username nya salah" ,
      password: "1234"
    }

    request(app)
    .post('/users/login')
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toHaveProperty('Wrong Username or Password')
      done()
    });
  });
});

//===================== error test no username n pass  =========================
describe('POST /users/login', function() {
  it('return status 400 and error msg', function(done) {
    let body = {
      username: "" ,
      password: ""
    }

    request(app)
    .post('/users/login')
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toHaveProperty('Wrong Username or Password')
      done()
    });
  });
});