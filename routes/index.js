const router = require('express').Router()
const userRoute = require('./user-route')
const fieldRoute = require('./field-route')
const plantRoute = require('./plant-route')
const history = require('./history-data')
const authenticate = require('../middleware/authenticate')

router.use('/', userRoute)
router.use(authenticate)
router.use('/fields', fieldRoute)
router.use('/plants', plantRoute)
router.use('/history', history)

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

- GET/plants/:fieldId
- POST/plants/:fieldId
- PUT/plants/:fieldId/:plantId
- DELETE/plants/:fieldId/:plantId
 */