const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

var validateEmail = function(email){
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
}
const userSchema = new Schema({
  name: {
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique: true,
    required: 'Email Address is Required',
    validate: [validateEmail, 'Please Fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
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
