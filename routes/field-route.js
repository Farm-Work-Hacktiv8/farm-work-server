const router = require('express').Router()
const FieldController = require('../controllers/fields-controller')

router.get('/', FieldController.getFields)

router.post('/', FieldController.addFields)

router.put('/:fieldId', FieldController.updateFields)

router.delete('/:fieldId', FieldController.deleteFields)

module.exports = router