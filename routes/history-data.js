const express = require('express')
const router = express.Router()
const Controller = require('../controllers/history')

router.get('/', Controller.history)

module.exports = router