const express = require('express')
const router = express.Router()
const SystemController = require('../controllers/system')

router.get('/users', SystemController.getSystemUsers)

module.exports = router
