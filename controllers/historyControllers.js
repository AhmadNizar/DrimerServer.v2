const History = require('../models/historyModel')

class HistoryCtrl {

  static async findAllHistory (req, res) {
    try {
      res.status(200).send(await History.find())
    } catch (e) {
      res.status(400).send(e)
    }
  }

  static async createHistoryUser (req,res) {
    try {
      res.status(200).send( await History.create({
        userHistory : req.body.userHistory,
        drinkWater  : req.body.drinkWater,
        stepDay     : req.body.stepDay,
        createdAt   : req.body.createdAt,
        drinkTime   : req.body.drinkTime,
        dayWeather  : req.body.dayWeather
      }))
    } catch (e) {
      res.status(400).send(e)
    }
  }
}

module.exports = HistoryCtrl
