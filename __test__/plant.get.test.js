const {app} = require("../app");
const request = require("supertest");
const { User, sequelize, Field } = require("../models");
const { clearDBPlant, clearDBUser, clearDBField } = require("../helper/clearDB");
const { newToken } = require("../helper/access_token");

let token;
let token2;
let fieldId
let fieldId2
let userId
let userId2

const user = {
    firstName: "Wahyu6",
    lastName: "Danang6",
    email: "danang1236@gmail.com",
    username: "wahyudanang6",
    password: "1234566",
};
const user2 = {
    firstName: "user2",
    lastName: "user2",
    email: "user2@gmail.com",
    username: "user2",
    password: "1234566",
};

beforeAll((done) => {
    User.create(user)
        .then((data) => {
            return User.findOne({ where: { username: user.username } });
        })
        .then((data) => {
            const payload = {
                id: data.id,
                username: data.username,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
            };
            userId = data.id;
            token = newToken(payload);
            return User.create(user2)
        })
        .then((data) => {
            const payload = {
                id: data.id,
                username: data.username,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
            };
            userId2 = data.id
            token2 = newToken(payload);

            return Field.create({
                fieldName: 'kebon jukut',
                fieldArea: 100,
                userId: userId
            })
        })
        .then(data => {
            fieldId = data.id
            done()
        })
        .catch((err) => {
            console.log(err);
        });
});

afterAll((done) => {
    clearDBField({ id: fieldId })
        .then(() => {
            return clearDBUser({ id: userId });
        })
        .then(() => {
            return clearDBUser({ id: userId2 });
        })
        .then(() => {
            sequelize.close();
            done();
        })
        .catch((err) => {
            done(err);
        });
});

describe("GET /plants/:fieldId", () => {
    // Test Case : success- get all plants
    it("should send response with 200 status code", (done) => {
        request(app)
            .get(`/plants/${fieldId}`)
            .set("access_token", token)
            .end((err, res) => {
                err ? done(err) : expect(res.statusCode).toEqual(200);
                expect(typeof res.body).toEqual("object");
                done();
            });
    });

    // Test Case: fail - dont have permission (wrong access token)
    it("should send response with 403 status code", (done) => {
        request(app)
            .get(`/plants/${fieldId}`)
            .set("access_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ3YWh5dWRhbmFuZyIsImlhdCI6MTYxNjIxMzEwMn0.mPx07ki9eYSup0XYqueJaMDJJjZBciTSQRabk8RkVuQ")
            .end((err, res) => {
                err ? done(err) : 
                
                expect(res.statusCode).toEqual(403);
                expect(typeof res.body).toEqual("object");
                expect(res.body).toHaveProperty("error");
                expect(typeof res.body.error).toEqual("string");
                expect(res.body.error).toEqual("Please login first.");

                done();
            });
    });

    // Test Case: fail - Unauthorized access to people field
    it("should send response with 403 status code", (done) => {
        request(app)
            .get(`/plants/${fieldId}`)
            .set("access_token", token2)
            .end((err, res) => {
                err ? done(err) : 
                
                expect(res.statusCode).toEqual(401);
                expect(typeof res.body).toEqual("object");
                expect(res.body).toHaveProperty("error");
                expect(res.body.error).toEqual("Not Authorized");

                done();
            });
    });

    // Test Case: fail - No Field ID - DataBase error
    it("should send response with 500 status code", (done) => {
        request(app)
            .get(`/plants/-1`)
            .set("access_token", token2)
            .end((err, res) => {
                err ? done(err) : 
                
                expect(res.statusCode).toEqual(500);
                expect(typeof res.body).toEqual("object");

                done();
            });
    });
});
