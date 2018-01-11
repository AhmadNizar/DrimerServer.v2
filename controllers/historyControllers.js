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
    
  })
}

module.exports = {
  findAllHistory
}