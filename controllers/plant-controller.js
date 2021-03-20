const { Field, Plant, PlantField } = require('../models')

class PlantController {

  static fetchPlant (req, res, next) {
    Field.findOne({
      where: {id: req.params.fieldId},
      include: [Plant]
    })
      .then(fields => {
        res.status(200).json(fields)
      })
      .catch(err => {
        next(err)
      })
  }

  static createPlant (req, res, next) {
    const fieldId = req.params.fieldId
    const {plantName, harvestTime} = req.body
    const plant = {
      plantName,
      harvestTime
    }

    Plant.create(plant)
    .then((response) => {
      PlantField.create({fieldId, plantId: response.id})
      res.status(201).json(response)
    })
    .catch((err) => {
      next(err)
    })
  }

  static editPlant (req, res, next) {
    const {plantId} = req.params
    const {plantName, harvestTime} = req.body

    if(!plantName) throw ({name: 'custom', status: 400, msg: 'Plant name is required.'})

    if(harvestTime <= 0) throw ({name: 'custom', status: 400, msg: "Harvest time should be greater than 1 day."})

    Plant.update({plantName, harvestTime}, {where : {id: plantId}, returning: true})
    .then((plant) => {
      console.log(plant, "<<<< plant hasil put");
      res.status(200).json(plant[1][0])
    })
    .catch((err) => {
      next(err)
    })
  }

  static destroyPlant (req, res, next) {
    const {plantId} = req.params
    Plant.destroy({where: {id: plantId}, returning: true})
    .then((data) => {
      res.status(200).json({msg: 'Delete success'})
    })
    .catch((err) => {
      next(err)
    })
  }
}

module.exports = PlantController