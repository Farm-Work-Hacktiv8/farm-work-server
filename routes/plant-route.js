const router = require('express').Router()
const Controller = require('../controllers/plant-controller')
const {authorizePlant, authorizeField} = require('../middleware/authorize')

router.get('/:fieldId', authorizeField, Controller.fetchPlant)

router.post('/:fieldId', authorizeField, Controller.createPlant)

router.put('/:fieldId/:plantId', authorizePlant, Controller.editPlant)

router.delete('/:fieldId/:plantId', authorizePlant, Controller.destroyPlant)

module.exports = router