const express = require("express");
const cors = require("cors");
const app = express();
const errorHandling = require('./middleware/errorHandling')

const router = require("./routes");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use(errorHandling);

module.exports = app;


// untuk cek coverage testing jest
// jest --coverage --watchAll