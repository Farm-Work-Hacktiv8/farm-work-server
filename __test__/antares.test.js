const request = require('supertest');
const {app, server} = require("../app")
const {sequelize, User} = require('../models')
const { newToken } = require("../helper/access_token");

let token
let userId 

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
      return User.findOne({where: {username: user.username}})
  })
  .then(data => {
      const payload = {
          id: data.id,
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName
      }
      userId = data.id
      token = newToken(payload);
      done()
  })
  .catch( err => {
      done(err);
  })
})

afterAll((done) => {
  User.destroy({where: {id: userId} })
    .then(() => {
      sequelize.close()
      done()
    })
    .catch(err => {
      console.log(err);
    })
})

// ========================== GET data from Antares ==========================
describe('POST /monitor', function() {
  it('hit antares server', function(done) {
    request(server)
    .post('/monitor')
    .set("access_token", token)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(201)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('temperature')
      expect(res.body).toHaveProperty('humidity')
      expect(res.body).toHaveProperty('wind_speed')
      expect(res.body).toHaveProperty('rain_level')
      expect(res.body).toHaveProperty('latitude')
      expect(res.body).toHaveProperty('longitude')
      expect(res.body).toHaveProperty('moisture')
      done()
    });
  });
});

// ========================== SEND data to Client ==========================
describe('GET /data', function() {
  it('Get data from antares', function(done) {
    request(app)
    .get('/data')
    .set("access_token", token)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(200)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('temperature')
      expect(res.body).toHaveProperty('humidity')
      expect(res.body).toHaveProperty('wind_speed')
      expect(res.body).toHaveProperty('rain_level')
      expect(res.body).toHaveProperty('latitude')
      expect(res.body).toHaveProperty('longitude')
      expect(res.body).toHaveProperty('moisture')
      done()
    });
  });
});