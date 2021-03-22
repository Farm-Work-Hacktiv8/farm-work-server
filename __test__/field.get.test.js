const {app} = require("../app");
const request = require("supertest");
const { sequelize, User, Field } = require("../models");
const { clearDBField, clearDBUser } = require("../helper/clearDB");
const { newToken } = require("../helper/access_token");

let token;
let token2 = "";
let userId
let fieldId

const user = {
    firstName: "Wahyu2",
    lastName: "Danang2",
    email: "danang1232@gmail.com",
    username: "wahyudanang2",
    password: "1234562",
};

const field = {
    fieldName: 'kebon jukut',
    fieldArea: 100,
    userId
}

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
            userId = data.id
            token = newToken(payload);
            return Field.create(field)
        })
        .then((data)=>{
            fieldId = data.id
            done()
        })
        .catch((err) => {
            done(err);
        });
});

afterAll((done) => {
    clearDBField({id: fieldId})
        .then(() => {
            return clearDBUser({id: userId})
        })
        .then((data) => {
            done();
        })
        .catch((err) => {
            done(err);
        });
});

describe("GET /fields", () => {
    // Test Case : success- get all fields
    it("should send response with 200 status code", (done) => {
        request(app)
            .get("/fields")
            .set("access_token", token)
            .end((err, res) => {
                err ? done(err) : 
                
                expect(res.status).toEqual(200);
                expect(typeof res.body).toEqual("object");
                done();
            });
    });

    // Test Case : fail - dont have permission (wrong access token)
    it("should send response with 403 status code", (done) => {
        request(app)
            .get(`/fields`)
            .set("access_token", token2)
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
});
