const app = require("../app");
const request = require("supertest");
const { User, sequelize } = require("../models");
const { clearDBPlant, clearDBUser } = require("../helper/clearDB");
const { newToken } = require("../helper/access_token");

const user = {
    firstName: "Wahyu",
    lastName: "Danang",
    email: "danang123@gmail.com",
    username: "wahyudanang",
    password: "123456",
};

let token;
let token2 = "";
let id;

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
            id = data.id;
            token = newToken(payload);
            done();
        })
        .catch((err) => {
            console.log(err);
        });
});

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
});

describe("DELETE /plants/:id", () => {
    // Test Case : success- delete Plant by id
    it("should send response with 200 status code", function (done) {
        request(app)
            .delete(`/plants/${id}`)
            .set("access_token", token)
            .end(function (err, res) {
                err ? done(err) : 
                
                expect(res.statusCode).toEqual(200);
                expect(typeof res.body).toEqual("object");
                expect(res.body).toHaveProperty("msg");
                expect(typeof res.body.msg).toEqual("string");
                expect(res.body.msg).toEqual("Delete success");
                done();
            });
    });

    // Test Case : fail - dont have permission (wrong access token)
    it("should send response with 403 status code", function (done) {
        request(app)
            .delete(`/plants/${id}`)
            .set("access_token", token2)
            .end(function (err, res) {
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
