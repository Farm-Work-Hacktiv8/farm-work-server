const app = require('../app')
const request = require('supertest')
const { User, sequelize, Field } = require('../models')
const { clearDBPlant, clearDBUser, clearDBField } = require("../helper/clearDB");
const { newToken } = require('../helper/access_token')

let token;
let token2 = "";
let fieldId
let userId

const user = {
    firstName: 'Wahyu7',
    lastName: 'Danang7',
    email: 'danang123700@gmail.com',
    username: 'wahyudanang700',
    password: '1234567',
}

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
            userId = data.id
            token = newToken(payload)
            return Field.create({
                fieldName: 'kebon jukut',
                fieldArea: 100,
                userId
            })
        })
        .then(data => {
            fieldId = data.id
            done()
        })
        .catch((err) => {
            console.log(err)
        })
})

afterAll((done) => {
    // clearDBPlant({ })
        // .then(() => {
        //     return clearDBField({ id: fieldId });
        // })
    clearDBField({ id: fieldId })
        .then(() => {
            return clearDBUser({ id: userId });
        })
        .then(() => {
            sequelize.close();
            done();
        })
        .catch((err) => {
            done(err);
        });
});

describe('POST /plants/:fieldId', () => {
    // Test Case : Success
    it("should send response with 201 status code", (done) => {
        const body = {
            plantName: "Mangga",
            harvestTime: 2
        };

        request(app)
            .post(`/plants/${fieldId}`)
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
                harvestTime: 30
            };

            request(app)
                .post(`/plants/${fieldId}`)
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
                harvestTime: 0
            };

            request(app)
                .post(`/plants/${fieldId}`)
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
            userId: 900
        };

        request(app)
            .post(`/plants/${fieldId}`)
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
