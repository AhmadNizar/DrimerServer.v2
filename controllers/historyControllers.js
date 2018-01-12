const History = require('../models/historyModel')

const findAllHistory = (req, res)=>{
  History.find()
  .then(result => {
    res.status(200).send(result)
  })
  .catch(err => {
    res.status(400).send(err)
  })
}

const createHistoryUser = (req,res) => {
  History.create({
    userHistory : req.body.userHistory,
    drinkWater : req.body.drinkWater,
    stepDay : req.body.stepDay,
    createdAt: req.body.createdAt,
    drinkTime: req.body.drinkTime,
    dayWeather : req.body.dayWeather,
  })
  .then(result => {
    res.status(200).send(result)
  })
  .catch(err => {
    res.status(400).send(err)
  })
}

module.exports = {
  findAllHistory,
  createHistoryUser
}
