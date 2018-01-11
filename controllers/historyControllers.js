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
    dayWeather : req.body.dayWeather,
    createdAt: req.body.createdAt,
    drinkTime: req.body.drinkTime
  })
  .then(result =>{
    res.send(result)
  })
  .catch(err => {
    res.send(err)
  })
}

module.exports = {
  findAllHistory,
  createHistoryUser
}