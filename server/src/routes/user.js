const UserController = require('../controllers/user')
const express = require('express')
const router = express.Router()

router.post('/register', UserController.save)
router.post('/login', UserController.login)
router.get('/onlineUsers', UserController.getOnlineUsers)
router.get('/userInfo/:id', UserController.getUserInfo)
router.put('/userInfo', UserController.updateUserInfo)
router.get('/findUsers', UserController.findUsers)
router.post('/report', UserController.reportUser)
router.get('/reportedList', UserController.getReportedList)
router.put('/disable', UserController.disableUser)
router.put('/noPassReport', UserController.noPassReport)
router.post('/getVerCode', UserController.getVerCode)
router.post('/resetPassword', UserController.resetPassword)

module.exports = router
