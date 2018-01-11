const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

const userSchema = new Schema({
  name: {
    type:String
  },
  password:{
    type:String
  },
  email:{
    type:String
  },
  age:{
    type:Number
  },
  gender:{
    type:String
  },
  sugest:{
    type: Number
  }
})

var User = mongoose.model('Users',userSchema)

module.exports = User;