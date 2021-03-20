const app = require("../app");
const request = require("supertest");
const { User, Plant, sequelize, Field, PlantField } = require("../models");
const { clearDBPlant, clearDBUser, clearDBField, clearDBPlantField } = require("../helper/clearDB");
const { newToken } = require("../helper/access_token");

let token;
let token2 = "";
let userId
let fieldId
let plantId;
let PFId;

const user = {
    firstName: "Wahyu8",
    lastName: "Danang8",
    email: "danang1238@gmail.com",
    username: "wahyudanang8",
    password: "1234568",
};

const plant = {
    plantName: 'Mangga',
    harvestTime: 20
}

const field = {
    fieldName: 'kebon jagong',
    fieldArea: 100,
    userId: userId
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
            fieldId = fieldResult.id
            console.log(fieldId, "<<< id field");
            return Plant.create(plant)
        })
        .then((plant) => {
            plantId = plant.id;
            console.log(plantId, "<< plant id >>>");
            return PlantField.create({fieldId, plantId})
        })
        .then((data) => {
            PFId = data.id
            console.log(data, "<<< hasil create plant field coyy");
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

describe("PUT /plants/:id", () => {

    // Test Case : success- update plant by id
    it("should send response with 200 status code", (done) => {
        const body = {
            plantName: "jeruk",
            harvestTime: 10,
        };

        request(app)
            .put(`/plants/${fieldId}/${plantId}`)
            .set("access_token", token)
            .send(body)
            .end((err, res) => {
                err ? done(err) : 
                
                expect(res.statusCode).toEqual(200);
                expect(typeof res.body).toEqual("object");
                expect(res.body).toHaveProperty("id");
                expect(res.body).toHaveProperty("plantName");
                expect(res.body).toHaveProperty("harvestTime");
                expect(res.body).toHaveProperty("createdAt");
                expect(res.body).toHaveProperty("updatedAt");

                expect(res.body.id).toEqual(plantId)
                expect(res.body.plantName).toEqual(res.body.plantName)
                expect(res.body.harvestTime).toEqual(res.body.harvestTime)
                expect(typeof res.body.createdAt).toEqual("string")
                expect(typeof res.body.updatedAt).toEqual("string")

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
            .put(`/plants/${fieldId}/${plantId}`)
            .set("access_token", token)
            .send(body)
            .end((err, res) => {
                err ? done(err) : 
                
                expect(res.statusCode).toEqual(400);
                expect(typeof res.body).toEqual("object");
                expect(res.body).toHaveProperty("error");
                expect(res.body.error).toEqual("Plant name is required.")
                done()
            });
    });

    // Test Case : fail - inputed harves time less than 1 day
    it("should send response with 400 status code", (done) => {
        const body = {
            plantName: "Jeruk",
            harvestTime: 0,
        };

        request(app)
            .put(`/plants/${fieldId}/${plantId}`)
            .set("access_token", token)
            .send(body)
            .end((err, res) => {
                err ? done(err) : 

                expect(res.statusCode).toEqual(400);
                expect(typeof res.body).toEqual("object");
                expect(res.body).toHaveProperty("error");
                expect(res.body.error).toEqual("Harvest time should be greater than 1 day.")
                done()
            });
    });

    // Test Case: fail - dont have permission (wrong access token)
    it("should send response with 403 status code", (done) => {
        const body = {
            plantName: "Jeruk",
            harvestTime: 10,
        };

        request(app)
            .put(`/plants/${fieldId}/${plantId}`)
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
