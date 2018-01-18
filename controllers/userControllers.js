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

  static async findUserById (req, res) {
    try {
      res.status(200).send(await User.findById(req.params.id))
    } catch (e) {
      res.status(500).send(err)
    }
  }

  static async registerUser (req, res) {
    try {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(req.body.password, salt)
      let userData = await User.create({
        name: req.body.name,
        password: hash,
        email: req.body.email,
        age: req.body.age,
        gender: req.body.gender,
      })
      res.status(200).send(userData)
    } catch (e) {
      res.status(422).send(e)
    }
  }

  static async loginUser (req, res) {
    try {
      let userDataObj = await User.findOne({ email: req.body.email })
      if( userDataObj === null ) {
        res.status(404).send({loginStatus: 'invalid'})
      } else {
        let comparePasswordResult = await bcrypt.compare(req.body.password, userDataObj.password)

        if (comparePasswordResult) {
          let userToken = jwt.sign({
              isLogin : true,
              userData : {
                _id   : userDataObj._id,
                name  : userDataObj.name,
                email : userDataObj.email,
                age   : userDataObj.age,
                gender: userDataObj.gender,
                sugest: userDataObj.sugest
              }
            }, 'halo')
            res.status(200).send({userToken})
        } else {
          res.status(404).send({loginStatus: 'invalid'})
        }
      }
    } catch (e) {
      res.status(500).send(e)
    }
  }

  static async deleteUser (req, res) {
    try {
      let deletedUser = await User.deleteOne({_id: req.params.id})
      res.status(200).send(deletedUser)
    } catch (err) {
      res.status(500).send(err)
    }
  }

  static async editUser (req, res) {

    try {
      let userData = await User.findById(req.params.id)

      userData.name     = req.body.name || userData.name,
      userData.password = req.body.password || userData.password,
      userData.email    = req.body.email || userData.email,
      userData.age      = req.body.age || userData.age,
      userData.gender   = req.body.gender || userData.gender,
      userData.sugest   = req.body.sugest || userData.sugest

      let newUserData = await userData.save()
      res.status(201).send(newUserData)
    } catch (err) {
      res.status(422).send(err)
    }
  }
}

module.exports = UserCtrl
