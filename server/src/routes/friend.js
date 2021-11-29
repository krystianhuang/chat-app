const express = require('express')
const router = express.Router()
const FriendController = require('../controllers/friend')

router.get('/list', FriendController.get)
router.post('/add', FriendController.add)

module.exports = router
