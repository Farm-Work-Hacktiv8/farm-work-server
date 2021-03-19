const { User, Field, Plant } = require("../models/index");

function clearDBField() {
    if (process.env.NODE_ENV === "test") {
        return Field.destroy({ where: {} });
    }
}

function clearDBPlant() {
    if (process.env.NODE_ENV === "test") {
        return Plant.destroy({ where: {} });
    }
}

function clearDBUser() {
    if (process.env.NODE_ENV === "test") {
        return User.destroy({ where: {} });
    }
}

module.exports = {
    clearDBField,
    clearDBUser,
    clearDBPlant
};
