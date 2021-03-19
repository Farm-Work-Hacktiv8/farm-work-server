const request = require('supertest');
const app = require("../app")
const {sequelize} = require('../models')

afterAll((done) => {
  sequelize.close()
  done()
})

//===================== success test REGISTER ========================================
describe('POST /users/register', function() {
  it('user register return status 201 and firstName, lastName, email, username, createdAt, updatedAt', function(done) {
    let body = {
      firstName: "Budi" ,
      lastName: "Santoso" ,
      email: "budi@mail.com" ,
      username: "budi1234" ,
      password: "123456"
    }

    request(app)
    .post('/users/register')
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(201)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('firstName')
      expect(res.body).toHaveProperty('lastName')
      expect(res.body).toHaveProperty('email')
      expect(res.body).toHaveProperty('username')
      expect(res.body).toHaveProperty('createdAt')
      expect(res.body).toHaveProperty('updatedAt')

      expect(res.body.firstName).toEqual(body.firstName)
      expect(res.body.lastName).toEqual(body.lastName)
      expect(res.body.email).toEqual(body.email)
      expect(res.body.username).toEqual(body.username)
      expect(typeof res.body.createdAt).toEqual('string')
      expect(typeof res.body.updatedAt).toEqual('string')
      done()
    });
  });
});

//===================== success test REGISTER with no LastName ==========================
describe('POST /users/register', function() {
  it('user register no firstName return status 400 and error message', function(done) {
    let body = {
      firstName: "Budi" ,
      lastName: "" ,
      email: "budi@mail.com" ,
      username: "budi1234" ,
      password: "123456"
    }

    request(app)
    .post('/users/register')
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(201)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('firstName')
      expect(res.body).toHaveProperty('lastName')
      expect(res.body).toHaveProperty('email')
      expect(res.body).toHaveProperty('username')
      expect(res.body).toHaveProperty('createdAt')
      expect(res.body).toHaveProperty('updatedAt')

      expect(res.body.firstName).toEqual(body.firstName)
      expect(res.body.lastName).toEqual(body.lastName)
      expect(res.body.email).toEqual(body.email)
      expect(res.body.username).toEqual(body.username)
      expect(typeof res.body.createdAt).toEqual('string')
      expect(typeof res.body.updatedAt).toEqual('string')
      done()
    });
  });
});

//===================== error test Register ========================================

//===================== error test Register no FirstName ============================
describe('POST /users/register', function() {
  it('user register no firstName return status 400 and error message', function(done) {
    let body = {
      firstName: "" ,
      lastName: "Santoso" ,
      email: "budi@mail.com" ,
      username: "budi1234" ,
      password: "123456"
    }

    request(app)
    .post('/users/register')
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(201)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('error')

      expect(res.body.error).toEqual('First Name cannot be Empty')
      done()
    });
  });
});

//===================== error test Register no Email ============================
describe('POST /users/register', function() {
  it('user register no Email return status 400 and error message', function(done) {
    let body = {
      firstName: "Budi" ,
      lastName: "Santoso" ,
      email: "" ,
      username: "budi1234" ,
      password: "123456"
    }

    request(app)
    .post('/users/register')
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(201)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('error')

      expect(res.body.error).toEqual('Email cannot be Empty')
      done()
    });
  });
});

//================= error test Register with invalid email format ==================
describe('POST /users/register', function() {
  it('user register with invalid email format return status 400 and error message', function(done) {
    let body = {
      firstName: "Budi" ,
      lastName: "Santoso" ,
      email: "budiaja" ,
      username: "budi1234" ,
      password: "123456"
    }

    request(app)
    .post('/users/register')
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(201)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('error')

      expect(res.body.error).toEqual('Invalid Email Format')
      done()
    });
  });
});

//===================== error test Register no Username ============================
describe('POST /users/register', function() {
  it('user register no Username return status 400 and error message', function(done) {
    let body = {
      firstName: "Budi" ,
      lastName: "Santoso" ,
      email: "budi@mail.com" ,
      username: "" ,
      password: "123456"
    }

    request(app)
    .post('/users/register')
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(201)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('error')

      expect(res.body.error).toEqual('Username cannot be Empty')
      done()
    });
  });
});

//=============== error test Register Username at least 4 characters ================
describe('POST /users/register', function() {
  it('user register no Username return status 400 and error message', function(done) {
    let body = {
      firstName: "Budi" ,
      lastName: "Santoso" ,
      email: "budi@mail.com" ,
      username: "bud" ,
      password: "123456"
    }

    request(app)
    .post('/users/register')
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(201)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('error')

      expect(res.body.error).toEqual('Username must contain at leats 4 characters')
      done()
    });
  });
});

//===================== error test Register no Password ============================
describe('POST /users/register', function() {
  it('user register no Password return status 400 and error message', function(done) {
    let body = {
      firstName: "Budi" ,
      lastName: "Santoso" ,
      email: "budi@mail.com" ,
      username: "budi1234" ,
      password: ""
    }

    request(app)
    .post('/users/register')
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(201)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('error')

      expect(res.body.error).toEqual('Password cannot be Empty')
      done()
    });
  });
});

//================ error test Register Password at least 6 characters =================
describe('POST /users/register', function() {
  it('user register no Password return status 400 and error message', function(done) {
    let body = {
      firstName: "Budi" ,
      lastName: "Santoso" ,
      email: "budi@mail.com" ,
      username: "budi1234" ,
      password: "1234"
    }

    request(app)
    .post('/users/register')
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(201)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('error')

      expect(res.body.error).toEqual('Password must contain at leats 6 characters')
      done()
    });
  });
});