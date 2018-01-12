const express = require('express')
const router = express.Router()
const user = require('../controllers/userControllers')
const jwt = require('../helper/jwtToken')

router.post ('/login', user.loginUser)
router.post('/register',user.registerUser)
router.put('/edit/:id', jwt.isLogin,jwt.authUser,user.editUser)
router.delete('/delete/:id',user.deleteUser)

module.exports = router;
