const app = require("../app");
const request = require("supertest");
const { User, Plant } = require("../models");
const { clearDBPlant, clearDBUser } = require("../helper/clearDB");
const { newToken } = require("../helper/access_token");

const user = {
    firstName: "Wahyu",
    lastName: "Danang",
    email: "danang123@gmail.com",
    username: "wahyudanang",
    password: "123456",
};

const plant = {
    plantName: 'Mangga',
    harvestTime: 20
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
            return Plant.create(plant)
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
    clearDBPlant()
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

describe("PUT /plants/:id", () => {

    // Test Case : success- update plant by id
    it("should send response with 200 status code", (done) => {
        const body = {
            plantName: "jeruk",
            harvestTime: 10,
        };

        request(app)
            .put(`/plants/${id}`)
            .set("access_token", token)
            .send(body)
            .end((err, res) => {
                err ? done(err) : 
                
                expect(res.statusCode).toEqual(200);
                expect(typeof res.body).toEqual("object");
                expect(res.body).toHaveProperty("message");
                expect(typeof res.body.message).toEqual("string")

                done();
            });
    });

    // Test Case : fail - not inputed plantName
    it("should send response with 400 status code", (done) => {
        const body = {
            plantName: "",
            harvestTime: 10,
        };

        request(app)
            .put(`/plants/${id}`)
            .set("access_token", token)
            .send(body)
            .end((err, res) => {
                err ? done(err) : 
                
                expect(res.statusCode).toEqual(400);
                expect(typeof res.body).toEqual("object");
                expect(res.body).toHaveProperty("error");
                expect(Array.isArray(res.body.error)).toEqual(true);
                expect(res.body.error).toEqual(
                    expect.arrayContaining(["Plant name is required."])
                );
            });
    });

    // Test Case : fail - inputed harves time less than 1 day
    it("should send response with 400 status code", (done) => {
        const body = {
            plantName: "Jeruk",
            harvestTime: 0,
        };

        request(app)
            .put(`/plants/${id}`)
            .set("access_token", token)
            .send(body)
            .end((err, res) => {
                err ? done(err) : 

                expect(res.statusCode).toEqual(400);
                expect(typeof res.body).toEqual("object");
                expect(res.body).toHaveProperty("error");
                expect(Array.isArray(res.body.error)).toEqual(true);
                expect(res.body.error).toEqual(
                    expect.arrayContaining(["Harvest time should be greater than 1 day."])
                );
            });
    });

    // Test Case: fail - dont have permission (wrong access token)
    it("should send response with 403 status code", (done) => {
        const body = {
            plantName: "Jeruk",
            harvestTime: 10,
        };

        request(app)
            .put(`/plants/${id}`)
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

});
