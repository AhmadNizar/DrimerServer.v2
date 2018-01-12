const jwt = require('jsonwebtoken')

const isLogin = (req, res, next) => {
  jwt.verify(req.headers.token, 'halo' , (err,decode) => {
    if (err) {
      res.send ('Please Login First')
    }else{
      req.headers.auth = decode
      next()
    }
  })  
}

const authUser = (req,res,next) => {
  if(req.headers._id == req._id || req.headers.id == req._id){
    next()
  }else{
    res.send("Not you authority!!!!")
  }
}

module.exports = {
  isLogin,
  authUser
};