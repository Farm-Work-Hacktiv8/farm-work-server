const app = require("../app");
const request = require("supertest");
const { User, Field } = require("../models");
const { clearDBField, clearDBUser } = require("../helper/clearDB");
const { newToken } = require("../helper/access_token");

const user = {
    firstName: "Wahyu",
    lastName: "Danang",
    email: "danang123@gmail.com",
    username: "wahyudanang",
    password: "123456",
};

const field = {
    fieldName: 'kebun jeruk'
}

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
            token = newToken(payload);
            return Field.create(field)
        })
        .then((data) => {
            id = data.id
            done();
        })
        .catch((err) => {
            console.log(err);
        });
});

afterAll((done) => {
    clearDBField()
        .then(() => {
            return clearDBUser()
        })
        .then((data) => {
            done();
        })
        .catch((err) => {
            console.log(err);
        });
});

describe("PUT /fields/:id", () => {
    // Test Case : success- update Field by id
    it("should send response with 200 status code", (done) => {
        const body = {
            fieldName: "jeruk",
        };

        request(app)
            .put(`/fields/${id}`)
            .set("access_token", token)
            .send(body)
            .end((err, res) => {
                err ? done(err) : expect(res.statusCode).toEqual(200);
                expect(typeof res.body).toEqual("object");
                expect(res.body).toHaveProperty("message");
                expect(typeof res.body.message).toEqual("string");

                done();
            });
    });

    // Test Case : fail - not inputed fieldName
    it("should send response with 400 status code", (done) => {
        const body = {
            fieldName: "",
        };

        request(app)
            .put(`/fields/${id}`)
            .set("access_token", token2)
            .send(body)
            .end((err, res) => {
                err ? done(err) : expect(res.statusCode).toEqual(400);
                expect(typeof res.body).toEqual("object");
                expect(res.body).toHaveProperty("error");
                expect(Array.isArray(res.body.error)).toEqual(true);
                expect(res.body.error).toEqual(
                    expect.arrayContaining(["Field name is required."])
                );
            });
    });

    // Test Case : fail - dont have permission (wrong access token)
    it("should send response with 403 status code", function (done) {
        request(app)
            .put(`/fields/${id}`)
            .set("access_token", token2)
            .end(function (err, res) {
                err ? done(err) : expect(res.statusCode).toEqual(403);
                expect(typeof res.body).toEqual("object");
                expect(res.body).toHaveProperty("error");
                expect(typeof res.body.error).toEqual("string");
                expect(res.body.error).toEqual("Please login first");
                done();
            });
    });
});
