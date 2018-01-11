const express = require('express')
const router = express.Router()
const History = require('../controllers/historyControllers')

router.get('/', History.findAllHistory )
router.post('/', History.createHistoryUser)

module.exports = router;