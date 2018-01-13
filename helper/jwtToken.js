const jwt = require('jsonwebtoken')

const isLogin = async (req, res, next) => {
  try {
    let decodeData = await jwt.verify(req.headers.token, 'halo')
    req.headers.auth = decodeData
    next()
  } catch (e) {
    res.status(401).send(e)
  }
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
