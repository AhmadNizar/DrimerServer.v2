const UserController = require('../controllers/userControllers')
const express = require('express')
const router = express.Router()

router.get('/',UserController.findAllUser)


module.exports = router;

<<<<<<< HEAD
//development branch
=======
//register branch
>>>>>>> register
