const router = require('express').Router()
const Controller = require('../controllers/plant-controller')
const {authorizePlant, authorizeField} = require('../middleware/authorize')

router.get('/:fieldId', authorizeField, Controller.fetchPlant)

router.post('/:fieldId', Controller.createPlant)

router.put('/:fieldId/:plantId', authorizePlant, Controller.editPlant)

router.delete('/:fieldId/:plantId', Controller.destroyPlant)

module.exports = router