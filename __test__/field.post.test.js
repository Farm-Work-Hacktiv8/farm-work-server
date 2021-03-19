const app = require('../app')
const request = require('supertest')
const { User } = require("../models");
const { clearDBField, clearDBUser } = require("../helper/clearDB");
const { newToken } = require("../helper/access_token");

const user = {
    firstName: 'Wahyu',
    lastName: 'Danang',
    email: 'danang123@gmail.com',
    username: 'wahyudanang',
    password: '123456'
}

let token

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
        
        token = newToken(payload);
        done()
    })
    .catch( err => {
        console.log(err);
    })
})

afterAll((done) => {
    clearDBField()
        .then(() => {
            return clearDBUser();
        })
        .then((data) => {
            done();
        })
        .catch((err) => {
            console.log(err);
        });
})

describe( 'POST /fields', () => {
    // Test Case 1: Success - post field
    it("should send response with 201 status code", (done) => {
        const body = {
            fieldName: "Kebun Mangga",
        };

        request(app)
            .post("/fields")
            .set("access_token", token)
            .send(body)
            .end((err, res) => {
                err ? done(err) : expect(res.statusCode).toEqual(201);
                expect(typeof body).toEqual("object");
                expect(res.body).toHaveProperty("fieldName");
                expect(typeof res.body.fieldName).toEqual("string");

                done();
            });
    });

    // Test Case  : fail - fieldName not inputed
    it("should send response with 400 status code"),
        (done) => {
            const body = {
                fieldName: "",
            };

            request(app)
                .post("/fields")
                .set("access_token", token)
                .send(body)
                .end((err, res) => {
                    err ? done(err) : expect(res.statusCode).toEqual(400);
                    expect(typeof res.body).toEqual("object");
                    expect(res.body).toHaveProperty("error");
                    expect(Array.isArray(res.body.error)).toEqual(true);
                    expect(res.body.error).toEqual(
                        expect.arrayContaining(["Field name is required."])
                    );

                    done();
                });
        };

    // Test Case : fail - dont have permission (wrong access token)
    it("should send response with 403 status code", (done) => {
        request(app)
            .post(`/fields`)
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
})