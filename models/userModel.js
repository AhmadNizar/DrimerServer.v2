const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

const userSchema = new Schema({
  name: {
    type:String,
    required:true,
    validate: {
      validator: function(v) {
        return /^[A-z ]+$/.test(v)
      },
      message: 'Invalid name format'
    }
  },
  password:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required: [true, 'Email address is required'],
    unique: [true, 'Email address is not unique'],
    validate: {
      validator: function(v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
      },
      message: 'Invalid email address'
    }
  },
  age:{
    type: Number,
    required: true
  },
  gender:{
    type:String,
    required: true,
    enum: ["Male","Female"]
  },
  sugest:{
    type: Number
  }
})

var User = mongoose.model('Users',userSchema)

module.exports = User;
