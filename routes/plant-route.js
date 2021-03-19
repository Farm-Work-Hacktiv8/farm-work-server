const router = require('express').Router()
const Controller = require('../controllers/plant-controller')

router.get('/', Controller.fetchPlant)

router.post('/', Controller.createPlant)

router.put('/:id', Controller.editPlant)

router.delete('/:id', Controller.destroyPlant)

module.exports = router