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
        userHistory : req.headers.auth._id,
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

  static async getUserHistoryByUserId (req, res) {
    try {
      res.status(200).send(await History.find({
        userHistory: req.headers.auth._id
      }))
    } catch (e) {
      res.status(500).send(e)
    }
  }
}

module.exports = HistoryCtrl
