const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config

var findAllUser= (req,res)=>{
  User.find()
  .then(result=>{
    res.send(result)
  })
  .catch(err=>{
    console.error(err)
  })
}

var registerUser = (req,res)=>{
  var salt = bcrypt.genSaltSync(10)
  var hash = bcrypt.hashSync(req.body.password, salt)
  User.create({
    name: req.body.name,
    salt: salt,
    password: hash,
    email: req.body.email,
    age: req.body.age,
    gender: req.body.gender,
    sugest: req.body.sugest
  })
  .then(result=>{
    res.send(result)
  })
  .catch(err=>{
    console.error(err)
  })
}

var loginUser = (req,res)=>{
  User.findOne({
    email: req.body.email
  })
  .then( result =>{
    if(result === null){
      res.send('Invalid')
    }else{
      if(bcrypt.compareSync(req.body.password, result.password)){
        var token = jwt.sign({
          _id:result._id,
          email: result.email,
          name: result.name          
        },'halo')
        console.log('ini,dat,',token)
        res.send(token)
      }else{
        res.send('Invalid')
      }
    }
  })
  .catch(err=>{
    console.error(err)
  })
}

var deleteUser =(req,res)=>{
  User.deleteOne({
    _id: req.params.id
  })
  .then(result=>{
    res.send('User Has Been Deleted by System')
  })
  .catch(err=>{
    console.error(err)
  })
}

var editUser = (req,res) => {
  User.findByIdAndUpdate(req.params.id,{
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    age: req.body.email,
    gender: req.body.gender,
    sugest: req.body.sugest
  })
  .then(result => {
    res.send('User has been Updated')
  })
  .catch(err => {
    res.send(err)
  })
}

module.exports = {
  findAllUser,
  registerUser,
  loginUser,
  deleteUser,
  editUser
};