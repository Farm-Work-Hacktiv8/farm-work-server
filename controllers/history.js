const antares = require('antares-http')
const moment = require('moment')

class History {

  static history (req, res, next) {
  antares.setAccessKey('dfe2a7a897cf3bf6:f3d649b0b43e7d88');
  antares.getAll('Hacktiv8','farm', 5)
  .then((response) => {
    console.log(response)
    let temp = []
     for (let i = 0 ; i < response.length ; i ++){
       if(response[i].content.pump === 1){
         temp.push(moment(response[i].created_time).format('MMMM Do YYYY, h:mm:ss a'))
       }
     }
     res.status(200).json(temp)
  })
  .catch((err) => {
    next(err)
  })
  } 
}


module.exports = History