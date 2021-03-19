const router = require('express').Router()
const userRoute = require('./user-route')
const fieldRoute = require('./field-route')
const plantRoute = require('./plant-route')

router.use('/', userRoute)
//router.use('/fields', fieldRoute)
router.use('/plants', plantRoute)

module.exports = router

/**
 * User
- POST/login
- POST/register

Fields

- GET/fields
- POST/fields
- PUT/fields/:id
- DELETE/fields/:id

Plants

- GET/plants
- POST/plants
- PUT/plants/:id
- DELETE/plants/:id
 */