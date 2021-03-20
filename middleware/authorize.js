const { Field, Plant, PlantField } = require('../models')

const authorizeField = (req, res, next) => {
  const userId = req.dataUser.id

  Field.findOne({
    where: {
      id: req.params.fieldId
    }
  })
    .then(field => {
      if(!field){
        throw({name: 'custom', status: 404, msg: 'Field Not Found'})
      }
      if(field.userId !== userId){
        throw({name: 'custom', status: 401, msg: 'Not Authorized'})
      }
      next()
    })
    .catch(err => {
      next(err)
    })
}

const authorizePlant = (req, res, next) => {
  PlantField.findOne({
    where: {
      fieldId: req.params.fieldId
    }
  })
    .then(field => {
      if(field.plantId !== req.params.plantId){
        throw({name: 'custom', status: 401, msg: 'Not Authorized'})
      }
      next()
    })
    .catch(err => {
      next(err)
    })
}


module.exports = { authorizeField, authorizePlant }