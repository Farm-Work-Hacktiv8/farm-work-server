const express = require("express");
const cors = require("cors");
const app = express();
const errorHandling = require('./middleware/errorHandling')
const server = require('http').createServer(app)
const util = require('util')
const moment = require('moment')

const router = require("./routes");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let data = {
	temperature: 0,
	humidity: 0,
	moisture: 0,
	pump: ''
}
app.post('/monitor', function(req, res, next) {
    const response = (JSON.parse(req.body['m2m:sgn']['m2m:nev']['m2m:rep']['m2m:cin'].con))
    console.log(response);
		data.temperature = response.temperature
		data.humidity = response.humidity
		if(response.pump === 1){
			data.pump = moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')
		}
		data.moisture = response.moisture
    res.status(201).json(response);
});
app.get('/data', (req, res) => {
	res.status(200).json(data)
})
app.use(router);
app.use(errorHandling);

module.exports = {app, server};


// untuk cek coverage testing jest
// jest --coverage --watchAll