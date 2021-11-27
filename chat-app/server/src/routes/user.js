const UserController = require('../controllers/user')
const express = require('express')
const router = express.Router()

router.get('/user', UserController.get)
router.post('/user', UserController.save)

module.exports = router
