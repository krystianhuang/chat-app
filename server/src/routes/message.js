const express = require('express')
const router = express.Router()
const MessageController = require('../controllers/message')

router.get('/recent', MessageController.getRecentMessages)
router.delete('/:id', MessageController.deleteMessage)

module.exports = router
