const router = require('express').Router()
const FieldController = require('../controllers/fields-controller')

router.get('/', FieldController.getFields)

router.post('/', FieldController.addFields)

router.put('/:id', FieldController.updateFields)

router.delete('/:id', FieldController.deleteFields)

module.exports = router