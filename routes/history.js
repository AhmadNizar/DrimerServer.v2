const express = require('express')
const router = express.Router()
const History = require('../controllers/historyControllers')
const jwt = require('../helper/jwtToken')

router.get('/', jwt.isLogin, jwt.authUser, History.findAllHistory )
router.get('/user', jwt.isLogin, jwt.authUser, History.getUserHistoryByUserId)
router.post('/', jwt.isLogin,jwt.authUser,History.createHistoryUser)

module.exports = router;
