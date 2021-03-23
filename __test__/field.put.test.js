const {app} = require("../app");
const request = require("supertest");
const { User, Field } = require("../models");
const { clearDBField, clearDBUser } = require("../helper/clearDB");
const { newToken } = require("../helper/access_token");

let token;
let token2 = "";
let userId
let fieldId

const user = {
    firstName: "Wahyu4",
    lastName: "Danang4",
    email: "danang123400@gmail.com",
    username: "wahyudanang400",
    password: "1234564",
};

const field = {
    fieldName: 'kebun jeruk',
    fieldArea: 100,
    userId
}


beforeAll((done) => {
    User.create(user)
        .then((data) => {
            console.log(data, "<< hasil create user di put field");
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
            console.log(userId)
            token = newToken(payload);
            return Field.create(field)
        })
        .then((data) => {
            fieldId = data.id
            console.log(fieldId)
            done();
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

describe("PUT /fields/:id", () => {
    // Test Case : success- update Field by id
    it("should send response with 200 status code", (done) => {
        const body = {
            fieldName: "jeruk",
            fieldArea: 100,
        };

        request(app)
            .put(`/fields/${fieldId}`)
            .set("access_token", token)
            .send(body)
            .end((err, res) => {
                err ? done(err) : expect(res.statusCode).toEqual(200);
                expect(typeof res.body).toEqual("object");
                expect(res.body).toHaveProperty("fieldName");
                expect(res.body).toHaveProperty("fieldArea");
                expect(typeof res.body.fieldName).toEqual("string");
                expect(typeof res.body.fieldArea).toEqual("number");
                expect(res.body.fieldName).toEqual(body.fieldName);
                expect(res.body.fieldArea).toEqual(body.fieldArea);

                done();
            });
    });

    // Test Case : fail - not inputed fieldName
    it("should send response with 400 status code", (done) => {
        const body = {
            fieldName: "",
            fieldArea: 100,
        };

        request(app)
            .put(`/fields/${fieldId}`)
            .set("access_token", token)
            .send(body)
            .end((err, res) => {
                err ? done(err) : expect(res.statusCode).toEqual(400);
                expect(res.body).toHaveProperty("error");
                expect(typeof res.body).toEqual("object");
                expect(typeof res.body.error).toEqual("string");
                expect(res.body.error).toEqual("Field name is required.");

                done()
            });
    });

    // Test Case : fail - inputed fieldArea with 0 
    it("should send response with 400 status code", (done) => {
        const body = {
            fieldName: "Kebon Jeruk",
            fieldArea: 0,
        };

        request(app)
            .put(`/fields/${fieldId}`)
            .set("access_token", token)
            .send(body)
            .end((err, res) => {
                err ? done(err) : 
                
                expect(res.statusCode).toEqual(400);
                expect(typeof res.body).toEqual("object");
                expect(res.body).toHaveProperty("error");
                expect(typeof res.body.error).toEqual("string");
                expect(res.body.error).toEqual("Field area should be greater than 1 meter.");

                done()
            });
    });

    // Test Case : fail - not inputed fieldArea
    it("should send response with 400 status code", (done) => {
        const body = {
            fieldName: "Kebon Jeruk",
            fieldArea: "",
        };

        request(app)
            .put(`/fields/${fieldId}`)
            .set("access_token", token)
            .send(body)
            .end((err, res) => {
                err ? done(err) : 
                
                expect(res.statusCode).toEqual(400);
                expect(typeof res.body).toEqual("object");
                expect(res.body).toHaveProperty("error");
                expect(typeof res.body.error).toEqual("string");
                expect(res.body.error).toEqual("Field Area is required");

                done()
            });
    });

    // Test Case : fail - dont have permission (wrong access token)
    it("should send response with 403 status code", (done) => {
        request(app)
            .put(`/fields/${fieldId}`)
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
});
