const express = require('express')
const router = express.Router()
const User = require('../controllers/userControllers')
const jwt = require('../helper/jwtToken')

router.post ('/login', User.loginUser)
router.post('/register',User.registerUser)
router.put('/edit/:id', jwt.isLogin,jwt.authUser,User.editUser)
router.delete('/delete/:id',User.deleteUser)

module.exports = router;
