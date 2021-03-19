const { Field } = require('../models')

class FieldController {
  static getFields(req, res, next) {
    Field.findAll()
      .then(fields => {
        res.status(200).json(fields)
      })
      .catch(err => {
        next(err)
      })
  }

  static addFields(req, res, next) {
    let newInputField = {
      fieldName: req.body.fieldName,
      fieldArea: req.body.fieldArea
    }

    Field.create(newInputField)
      .then(newDataField => {
        res.status(201).json(newDataField)
      })
      .catch(err => {
        next(err)
      })
  }

  static updateFields(req, res, next) {
    let newUpdateField = {
      fieldName: req.body.fieldName,
      fieldArea: req.body.fieldArea
    }

    Field.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(field => {
        if(!field) throw ({name: 'custom', status: 400, msg: "Invalid Field"})

        return Field.update(newUpdateField, {
          where: {
            id: req.params.id
          }
        })
      })
      .then(newDataField => {
        res.status(201).json(newDataField)
      })
      .catch(err => {
        next(err)
      })
  }

  static deleteFields(req, res, next) {
    Field.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(field => {
      if(!field) throw ({name: 'custom', status: 400, msg: "Invalid Field"})

      return Field.delete({
        where: {
          id: req.params.id
        }
      })
    })
      .then (() => {
        res.status(200).json({msg: "Field successfully deleted"})
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = FieldController