const express = require('express')
const router = express.Router()
const ChatController = require('../controllers/chat')

router.get('/list', ChatController.getChatList)
router.post('/addConversation', ChatController.addConversation)
router.delete('/deleteConversation', ChatController.deleteConversation)

module.exports = router
