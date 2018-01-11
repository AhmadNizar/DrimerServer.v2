const express = require('express')
const router = express.Router()
const user = require('../controllers/userControllers')

router.post ('/login',user.loginUser)
router.post('/register',user.registerUser)
router.put('/sugest/:id',user.editUser)
router.delete('/delete/:id',user.deleteUser)
module.exports = router;
