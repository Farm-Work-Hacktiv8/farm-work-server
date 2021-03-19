const app = require("../app");
const request = require("supertest");
const { User } = require("../models");
const { clearDBField } = require("../helper/clearDB");
const { newToken } = require("../helper/access_token");

const user = {
    firstName: "Wahyu",
    lastName: "Danang",
    email: "danang123@gmail.com",
    username: "wahyudanang",
    password: "123456",
};

let token;

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

            token = newToken(payload);
            done();
        })
        .catch((err) => {
            console.log(err);
        });
});

afterAll((done) => {
    clearDBField()
        .then((data) => {
            done();
        })
        .catch((err) => {
            console.log(err);
        });
});

describe("GET /fields", () => {
    // Test Case : success- get all fields
    it("should send response with 200 status code", (done) => {
        request(app)
            .get("/fields")
            .set("access_token", token)
            .end((err, res) => {
                err ? done(err) : expect(res.statusCode).toEqual(200);
                expect(typeof res.body).toEqual("object");
                done();
            });
    });

    // Test Case : fail - dont have permission (wrong access token)
    it("should send response with 403 status code", function (done) {
        request(app)
            .get(`/fields`)
            .set("access_token", token2)
            .end(function (err, res) {
                err ? done(err) : 
                
                expect(res.statusCode).toEqual(403);
                expect(typeof res.body).toEqual("object");
                expect(res.body).toHaveProperty("error");
                expect(typeof res.body.error).toEqual("string");
                expect(res.body.error).toEqual("Please login first");
                done();
            });
    });
});
