const express = require("express");
const cors = require("cors");
const app = express();
const errorHandling = require('./middleware/errorHandling')
const server = require('http').createServer(app)

const router = require("./routes");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let data 
app.post('/monitor', function(req, res, next) {
    const response = (JSON.parse(req.body['m2m:sgn']['m2m:nev']['m2m:rep']['m2m:cin'].con))
    data = response
    res.send(response);
});
app.get('/data', (req, res) => {
    res.send(data)
})
app.use(router);
app.use(errorHandling);

module.exports = {app, server};


// untuk cek coverage testing jest
// jest --coverage --watchAll