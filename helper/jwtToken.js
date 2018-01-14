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
  if(req.headers.auth.isLogin){
    next()
  }else{
    res.status(403).send({loginStatus: 'invalid'})
  }
}

module.exports = {
  isLogin,
  authUser
};
