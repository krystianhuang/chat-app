const express = require('express')
const router = express.Router()
const MessageController = require('../controllers/message')

router.get('/recent', MessageController.getRecentMessages)
router.delete('/:id', MessageController.deleteMessage)
router.post('/createTempMessages', MessageController.createTempMessages)
router.get('/getTempMessages', MessageController.getTempMessages)

module.exports = router
