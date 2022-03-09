const UserController = require('../controllers/user')
const express = require('express')
const router = express.Router()

router.post('/register', UserController.save)
router.post('/login', UserController.login)
router.get('/onlineUsers', UserController.getOnlineUsers)
router.get('/userInfo/:id', UserController.getUserInfo)
router.put('/userInfo', UserController.updateUserInfo)
router.get('/findUsers', UserController.findUsers)

module.exports = router
