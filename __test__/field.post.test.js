const app = require('../app')
const request = require('supertest')
const { User } = require("../models");
const { clearDBField, clearDBUser } = require("../helper/clearDB");
const { newToken } = require("../helper/access_token");

let token
let token2 = ''
let userId
let fiedId

const user = {
    firstName: 'Wahyu3',
    lastName: 'Danang3',
    email: 'danang1233@gmail.com',
    username: 'wahyudanang3',
    password: '1234563'
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
    clearDBField({ })
        .then(() => {
            return clearDBUser({ id: userId });
        })
        .then((data) => {
            done();
        })
        .catch((err) => {
            done(err);
        });
});

describe( 'POST /fields', () => {
    // Test Case 1: Success - post field
    it("should send response with 201 status code", (done) => {
        const body = {
            fieldName: "Kebun Mangga",
            fieldArea: 100,
            userId
        };

        request(app)
            .post("/fields")
            .set("access_token", token)
            .send(body)
            .end((err, res) => {
                err ? done(err) : expect(res.statusCode).toEqual(201);
                expect(typeof body).toEqual("object");
                expect(res.body).toHaveProperty("fieldName");
                expect(res.body).toHaveProperty("fieldArea");
                expect(res.body).toHaveProperty("userId");
                expect(typeof res.body.fieldName).toEqual("string");
                expect(typeof res.body.fieldArea).toEqual("number");
                expect(typeof res.body.userId).toEqual("number");
                done();
            });
    });

    // Test Case  : fail - fieldName not inputed
    it("should send response with 400 status code", (done) => {
        const body = {
            fieldName: "",
            fieldArea: 100,
            userId: 1,
        };

        request(app)
            .post("/fields")
            .set("access_token", token)
            .send(body)
            .end((err, res) => {
                err ? done(err) : expect(res.statusCode).toEqual(400);
                expect(typeof res.body).toEqual("object");
                expect(res.body).toHaveProperty("error");
                expect(typeof res.body.error).toEqual("string");
                expect(res.body.error).toEqual("Field name is required.");

                done();
            });
    });

    // Test Case  : fail - fieldAre must be greater than 1
    it("should send response with 400 status code", (done) => {
        const body = {
            fieldName: "Kebon jeruk",
            fieldArea: 0,
            userId: 1,
        };

        request(app)
            .post("/fields")
            .set("access_token", token)
            .send(body)
            .end((err, res) => {
                err ? done(err) : expect(res.statusCode).toEqual(400);
                expect(typeof res.body).toEqual("object");
                expect(res.body).toHaveProperty("error");
                expect(typeof res.body.error).toEqual("string");
                expect(res.body.error).toEqual("Field area should be greater than 1 meter.");

                done();
            });
    });

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
                expect(res.body.error).toEqual("Please login first.");
                done();
            });
    });
})