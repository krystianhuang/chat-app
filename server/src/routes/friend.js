const express = require('express')
const router = express.Router()
const FriendController = require('../controllers/friend')
const { geOnlineUserList } = require('../modules/socket')

router.get('/list', FriendController.getFriendList)
router.post('/add', FriendController.addFriend)
router.delete('/friends', FriendController.deleteFriend)
router.get('/isFriend', FriendController.isFriend)
router.get('/onlineUsers', geOnlineUserList)

module.exports = router
