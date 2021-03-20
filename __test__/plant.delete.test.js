const app = require("../app");
const request = require("supertest");
const { User, Field, Plant, PlantField, sequelize } = require("../models");
const {
    clearDBPlant,
    clearDBUser,
    clearDBPlantField,
    clearDBField,
} = require("../helper/clearDB");
const { newToken } = require("../helper/access_token");

let token;
let token2 = "";
let userId;
let fieldId
let plantId
let PFId

const user = {
    firstName: "Wahyu5",
    lastName: "Danang5",
    email: "danang1235@gmail.com",
    username: "wahyudanang5",
    password: "1234565",
};

const field = {
    fieldName: "kebun jeruk",
    fieldArea: 100,
    userId,
};

const plant = {
    plantName: 'dukuh',
    harvestTime: 12
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
        .then((fieldResult) => {
            fieldId = fieldResult.id;
            return Plant.create(plant)
        })
        .then((plantResult) => {
            plantId = plantResult.id
            return PlantField.create({fieldId, plantId})
        })
        .then((data)=> {
            PFId = data.id
            done();
        })
        .catch((err) => {
            done(err)
        });
});

afterAll((done) => {
    clearDBPlant({ id: plantId })
        .then(() => {
            return clearDBField({ id: fieldId });
        })
        .then(() => {
            return clearDBPlantField({ id: PFId });
        })
        .then(() => {
            return clearDBUser({ id: userId });
        })
        .then(() => {
            sequelize.close();
            done();
        })
        .catch((err) => {
            done(err);
        });
});

describe("DELETE /plants/:id", () => {
    // Test Case : success- delete Plant by id
    it("should send response with 200 status code", (done) => {
        request(app)
            .delete(`/plants/${fieldId}/${plantId}`)
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
    it("should send response with 403 status code", (done) => {
        request(app)
            .delete(`/plants/${fieldId}/${plantId}`)
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
