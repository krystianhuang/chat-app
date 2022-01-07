const express = require('express')
const router = express.Router()
const FriendController = require('../controllers/friend')

router.get('/list', FriendController.getFriendList)
router.post('/add', FriendController.addFriend)
router.delete('/friends', FriendController.deleteFriend)
router.get('/isFriend', FriendController.isFriend)

module.exports = router
