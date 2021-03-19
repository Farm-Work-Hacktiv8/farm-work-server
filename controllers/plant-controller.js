const { Plant } = require('../models')

class PlantController {

  static fetchPlant (req, res, next) {
    Plant.findAll()
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
  }

  static createPlant (req, res, next) {
    const {plantName, harvestTime} = req.body
    const plant = {
      plantName,
      harvestTime
    }
    Plant.create(plant)
    .then((response) => {
      res.status(201).json(response)
    })
    .catch((err) => {
      next(err)
    })
  }

  static editPlant (req, res, next) {
    const {id} = req.params
    const {plantName, harvestTime} = req.body
    Plant.update({plantName, harvestTime}, {where : {id}, returning: true})
    .then((plant) => {
      res.status(200).json(plant[1][0])
    })
    .catch((err) => {
      next(err)
    })
  }

  static destroyPlant (req, res, next) {
    const {id} = req.params
    Plant.destroy({where: {id}, returning: true})
    .then((data) => {
      res.status(200).json({msg: 'deleted succesfully'})
    })
    .catch((err) => {
      next(err)
    })
  }
}

module.exports = PlantController