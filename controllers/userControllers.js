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
  // console.log(req)
  var salt = bcrypt.genSaltSync(10)
  var hash = bcrypt.hashSync(req.body.password, salt)
  User.create({
    name: req.body.name,
    salt: salt,
    password: hash,
    email: req.body.email,
    age: req.body.age,
    gender: req.body.gender,
  })
  .then(result=>{
    res.status(200).send(result)
  })
  .catch(err=>{
    res.status(400).send(err)
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
module.exports = {
  findAllUser,
  registerUser,
  loginUser,
  deleteUser
};