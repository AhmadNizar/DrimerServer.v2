const User   = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt    = require('jsonwebtoken')
require('dotenv').config

class UserCtrl {

  static async findAllUser (req, res) {
    try {
      res.status(200).send(await User.find())
    } catch(err) {
      res.status(500).send(err)
    }
  }

  static async registerUser (req, res) {

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)

    try {
      let userData = await User.create({
        name: req.body.name,
        salt: salt,
        password: hash,
        email: req.body.email,
        age: req.body.age,
        gender: req.body.gender,
      })
      res.status(200).send(userData)
    } catch (err) {
      res.status(500).send(err)
    }
  }

  static loginUser (req, res) {

    User.findOne({
      email: req.body.email
    })
    .then(result => {
      if(result === null){
        res.status(404).send({loginStatus: 'Invalid'})
      }else{
        if(bcrypt.compareSync(req.body.password, result.password)){
          let token = jwt.sign({
            isLogin : true,
            userData: {
              _id     :result._id,
              name    : result.name,
              email   : result.email,
              age     : result.age,
              gender  : result.gender,
              sugest  : result.sugest
            }
          })
          res.status(200).send(token)
        } else {
          res.status(404).send({loginStatus: 'Invalid'})
        }
      }
    })
    .catch(err => res.status(500).send(err))
  }

  static async deleteUser (req, res) {
    try {
      let deletedUser = await User.deleteOne({_id: req.params.id})
      res.status(200).end(deletedUser)
    } catch (err) {
      res.status(500).send(err)
    }
  }

  static async editUser (req, res) {

    try {
      let userData = await User.findById(req.params.id)
      async userData => {
        userData.name     = req.body.name || userData.name,
        userData.password = req.body.password || userData.password,
        userData.email    = req.body.email || userData.email,
        userData.age      = req.body.age || userData.age,
        userData.gender   = req.body.gender || userData.gender,
        userData.sugest   = req.body.sugest || userData.sugest

        let newUserData = await userData.save()
        res.status(200).send(newUserData)
      }
    } catch (err) {
      res.status(500).send(err)
    }
  }
}

module.exports = UserCtrl
