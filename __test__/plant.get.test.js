const app = require("../app");
const request = require("supertest");
const { User, sequelize } = require("../models");
const { clearDBPlant, clearDBUser } = require("../helper/clearDB");
const { newToken } = require("../helper/access_token");

let token;

const user = {
    firstName: "Wahyu6",
    lastName: "Danang6",
    email: "danang1236@gmail.com",
    username: "wahyudanang6",
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

describe("GET /plants", () => {
    // Test Case : success- get all plants
    it("should send response with 200 status code", (done) => {
        request(app)
            .get("/plants")
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
            .get(`/plants`)
            .set("access_token", "wrong token")
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
