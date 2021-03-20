const router = require('express').Router()
const FieldController = require('../controllers/fields-controller')
const {authorizeField} = require('../middleware/authorize')

router.get('/', authorizeField, FieldController.getFields)

router.post('/', authorizeField, FieldController.addFields)

router.put('/:fieldId', authorizeField, FieldController.updateFields)

router.delete('/:fieldId', authorizeField, FieldController.deleteFields)

module.exports = router