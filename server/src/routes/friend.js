const express = require('express')
const router = express.Router()
const FriendController = require('../controllers/friend')

router.get('/list', FriendController.getFriendList)
router.post('/add', FriendController.addFriend)

module.exports = router
