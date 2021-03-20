const router = require('express').Router()
const FieldController = require('../controllers/fields-controller')
const {authorizeField} = require('../middleware/authorize')

router.get('/', FieldController.getFields)

router.post('/', FieldController.addFields)

router.put('/:fieldId', FieldController.updateFields)

router.delete('/:fieldId', FieldController.deleteFields)

module.exports = router