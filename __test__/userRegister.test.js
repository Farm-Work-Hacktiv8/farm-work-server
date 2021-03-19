const request = require('supertest');
const app = require("../app")
const {sequelize, User} = require('../models')

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

//===================== success test REGISTER ========================================
describe('POST /register', function() {
  it('user register return status 201 and firstName, lastName, email, username', function(done) {
    let body = {
      firstName: "Budi" ,
      lastName: "Santoso" ,
      email: "budi@mail.com" ,
      username: "budi1234" ,
      password: "123456"
    }

    request(app)
    .post('/register')
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

      expect(res.body.firstName).toEqual(body.firstName)
      expect(res.body.lastName).toEqual(body.lastName)
      expect(res.body.email).toEqual(body.email)
      expect(res.body.username).toEqual(body.username)
      done()
    });
  });
});

//===================== success test REGISTER with no LastName ==========================
describe('POST /register', function() {
  it('user register no firstName return status 201 and firstName, lastName, email, username', function(done) {
    let body = {
      firstName: 'Wahyu',
      lastName: '',
      email: 'danang123@gmail.com',
      username: 'wahyudanang',
      password: '123456'
    }

    request(app)
    .post('/register')
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

      expect(res.body.firstName).toEqual(body.firstName)
      expect(res.body.lastName).toEqual(body.lastName)
      expect(res.body.email).toEqual(body.email)
      expect(res.body.username).toEqual(body.username)
      done()
    });
  });
});

//===================== error test Register ========================================

//===================== error test Register no FirstName ============================
describe('POST /register', function() {
  it('user register no firstName return status 400 and error message', function(done) {
    let body = {
      firstName: "" ,
      lastName: "Santoso" ,
      email: "budi@mail.com" ,
      username: "wahyudanang2" ,
      password: "123456"
    }

    request(app)
    .post('/register')
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('error')

      expect(res.body.error).toEqual('First Name cannot be Empty')
      done()
    });
  });
});

//===================== error test Register no Email ============================
describe('POST /register', function() {
  it('user register no Email return status 400 and error message', function(done) {
    let body = {
      firstName: "Budi" ,
      lastName: "Santoso" ,
      email: "" ,
      username: "wahyudanang3" ,
      password: "123456"
    }

    request(app)
    .post('/register')
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('error')

      expect(res.body.error).toEqual('Email cannot be Empty')
      done()
    });
  });
});

//================= error test Register with invalid email format ==================
describe('POST /register', function() {
  it('user register with invalid email format return status 400 and error message', function(done) {
    let body = {
      firstName: "Budi" ,
      lastName: "Santoso" ,
      email: "budiaja" ,
      username: "wahyudanang4" ,
      password: "123456"
    }

    request(app)
    .post('/register')
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('error')

      expect(res.body.error).toEqual('Invalid Email Format')
      done()
    });
  });
});

//===================== error test Register no Username ============================
describe('POST /register', function() {
  it('user register no Username return status 400 and error message', function(done) {
    let body = {
      firstName: "Budi" ,
      lastName: "Santoso" ,
      email: "budi@mail.com" ,
      username: "" ,
      password: "123456"
    }

    request(app)
    .post('/register')
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('error')

      expect(res.body.error).toEqual('Username cannot be Empty')
      done()
    });
  });
});

//=============== error test Register Username at least 4 characters ================
describe('POST /register', function() {
  it('user register Username < 4 return status 400 and error message', function(done) {
    let body = {
      firstName: "Budi" ,
      lastName: "Santoso" ,
      email: "budi@mail.com" ,
      username: "bud" ,
      password: "123456"
    }

    request(app)
    .post('/register')
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('error')

      expect(res.body.error).toEqual('Username must contain at leats 4 characters')
      done()
    });
  });
});

//=============== error test Register with same Username ================
describe('POST /register', function() {
  it('user register with same Username return status 400 and error message', function(done) {
    let body = {
      firstName: "Budi" ,
      lastName: "Santoso" ,
      email: "budi@mail.com" ,
      username: "budi1234" ,
      password: "123456"
    }

    request(app)
    .post('/register')
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('error')

      expect(res.body.error).toEqual('Username already used')
      done()
    });
  });
});

//===================== error test Register no Password ============================
describe('POST /register', function() {
  it('user register no Password return status 400 and error message', function(done) {
    let body = {
      firstName: "Budi" ,
      lastName: "Santoso" ,
      email: "budi@mail.com" ,
      username: "wahyudanang5" ,
      password: ""
    }

    request(app)
    .post('/register')
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('error')

      expect(res.body.error).toEqual('Password cannot be Empty')
      done()
    });
  });
});

//================ error test Register Password at least 6 characters =================
describe('POST /register', function() {
  it('user register Password < 6 return status 400 and error message', function(done) {
    let body = {
      firstName: "Budi" ,
      lastName: "Santoso" ,
      email: "budi@mail.com" ,
      username: "wahyudanang5" ,
      password: "1234"
    }

    request(app)
    .post('/register')
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('error')

      expect(res.body.error).toEqual('Password must contain at leats 6 characters')
      done()
    });
  });
});