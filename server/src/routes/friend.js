const express = require('express')
const router = express.Router()
const FriendController = require('../controllers/friend')
const { geOnlineUserList } = require('../modules/socket')

router.get('/list', FriendController.getFriendList)
router.post('/add', FriendController.addFriend)
router.delete('/friends', FriendController.deleteFriend)
router.get('/isFriend', FriendController.isFriend)
router.get('/onlineUsers', geOnlineUserList)
router.get('/recommend', FriendController.getRecommendFriends)
router.put('/disLike', FriendController.notInterested)

module.exports = router
