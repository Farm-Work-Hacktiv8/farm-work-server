const antares = require('antares-http')
const moment = require('moment');
const { HistoricalData } = require('../models')

class History {

  static history (req, res, next) {
    let temp = []
    antares.setAccessKey('dfe2a7a897cf3bf6:f3d649b0b43e7d88');
    antares.getAll('Hacktiv8','farm', 100)
    .then((response) => {
      for (let i = response.length-1 ; i >= 0 ; i --){
        if(response[i].content.pump === 1){
          temp.push(moment(response[i].created_time).format('MMMM Do YYYY, h:mm:ss a'))
        }
      }
      return HistoricalData.findOne({ where: { createdAt: new Date() } })
    })
    .then((data) => {
        if (!data) {
            return HistoricalData.create({dataPerDay: temp});
        } else {
            return HistoricalData.update({dataPerDay: temp}, {
                where: { id: data.id },
                returning: true,
            });
        }
    })
    .then((data) => {
      return HistoricalData.findOne({
        where: { createdAt: new Date() },
      });
    })
    .then((data) => {
        res.status(200).json(data.dataPerDay);
    })
    .catch((err) => {
      next(err)
    })
  }
  
}


module.exports = History