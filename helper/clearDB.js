const { User, Field, Plant, PlantField } = require("../models/index");

function clearDBField(payload) {
    if (process.env.NODE_ENV === "test") {
        return Field.destroy({ where: payload });
    }
}

function clearDBPlant(payload) {
    if (process.env.NODE_ENV === "test") {
        return Plant.destroy({ where: payload });
    }
}

function clearDBPlantField(payload) {
    if (process.env.NODE_ENV === "test") {
        return PlantField.destroy({ where: payload });
    }
}

function clearDBUser(payload) {
    if (process.env.NODE_ENV === "test") {
        return User.destroy({ where: payload });
    }
}

module.exports = {
    clearDBField,
    clearDBUser,
    clearDBPlant,
    clearDBPlantField,
};
