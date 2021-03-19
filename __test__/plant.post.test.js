const app = require('../app')
const request = require('supertest')
const { User, sequelize } = require('../models')
const { clearDBPlant, clearDBUser } = require("../helper/clearDB");
const { newToken } = require('../helper/access_token')

const user = {
    firstName: 'Wahyu',
    lastName: 'Danang',
    email: 'danang123@gmail.com',
    username: 'wahyudanang',
    password: '123456',
}

let token
let token2 = ''

beforeAll((done) => {
    User.create(user)
        .then((data) => {
            const payload = {
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                username: data.username,
            }

            token = newToken(payload)
            done()
        })
        .catch((err) => {
            console.log(err)
        })
})

afterAll((done) => {
    clearDBPlant()
        .then(() => {
            clearDBUser();
            sequelize.close()
            done();
        })
        .catch((err) => {
            console.log(err);
        });
})

describe('POST /plants', () => {
    // Test Case : Success
    it("should send response with 201 status code", (done) => {
        const body = {
            plantName: "Mangga",
            harvestTime: 29,
        };

        request(app)
            .post("/plants")
            .set("access_token", token)
            .send(body)
            .end((err, res) => {
                err ? done(err) : 
                
                expect(res.statusCode).toEqual(201);
                expect(typeof body).toEqual("object");
                expect(res.body).toHaveProperty("plantName");
                expect(res.body).toHaveProperty("harvestTime");
                expect(typeof res.body.plantName).toEqual("string");
                expect(typeof res.body.harvestTime).toEqual("number");
                done();
            });
    });

    // Test Case : fail - plantName not inposted
    it("should send response with 400 status code", (done) => {
            const body = {
                plantName: "",
                harvestTime: 30,
            };

            request(app)
                .post("/plants")
                .set("access_token", token)
                .send(body)
                .end((err, res) => {
                    err ? done(err) : 
                    
                    expect(res.statusCode).toEqual(400);
                    expect(typeof res.body).toEqual("object");
                    expect(res.body).toHaveProperty("error");
                    expect(res.body.error).toEqual("Plant name is required.");

                    done();
                });

    });

    // Test Case : fail - harvestTime inposted less than 1 day
    it("should send response with 400 status code", (done) => {
            const body = {
                plantName: "Mangga",
                harvestTime: 0,
            };

            request(app)
                .post("/plants")
                .set("access_token", token)
                .send(body)
                .end((err, res) => {
                    err ? done(err) : 
                    
                    expect(res.statusCode).toEqual(400);
                    expect(typeof res.body).toEqual("object");
                    expect(res.body).toHaveProperty("error");
                    expect(res.body.error).toEqual("Harvest time should be greater than 1 day.");

                    done();
                });
    });


    // Test Case: fail - dont have permission (wrong access token)
    it("should send response with 403 status code", (done) => {
        const body = {
            plantName: "Mangga",
            harvestTime: 10,
        };

        request(app)
            .post(`/plants`)
            .set("access_token", token2)
            .send(body)
            .end((err, res) => {
                err ? done(err) : 

                expect(res.statusCode).toEqual(403);
                expect(typeof res.body).toEqual("object");
                expect(res.body).toHaveProperty("error");
                expect(typeof res.body.error).toEqual("string");
                expect(res.body.error).toEqual(
                    'Please login first.'
                );
                
                done();
            });
    });

})
