const { insetMessages } = require('../controllers/message')
const { Server } = require('socket.io')
const {
  insertValidateMessage,
  updateMessagesStatus
} = require('../controllers/validateMessages')
const { addFriend } = require('../controllers/friend')
const { VALIDATE_MESSAGE_STATUS } = require('../constants/constants')

const conversationList = {}

/** TODO: redis  */
const onlineUserList = {}
exports.onlineUserList = onlineUserList

const createSocket = () => {
  const socketIo = new Server(3002, {
    cors: {
      origin: '*',
      methods: '*',
      allowedHeaders: [
        'Origin',
        ' X-Requested-With',
        ' Content-Type',
        'Accept',
        'If-Modified-Since'
      ]
    }
  })

  socketIo.on('connection', socket => {
    console.log('Socket connect success')

    socket.on('online', user => {
      if (!user) return
      onlineUserList[user.id] = {
        id: user.id,
        name: user.username,
        loginTime: Date.now()
      }
      socketIo.sockets.emit('onlineUsers', onlineUserList)
      // socket.emit('onlineUsers', onlineUserList)
    })

    socket.on('offline', user => {
      if (!user) return
      if (onlineUserList[user.id]) {
        delete onlineUserList[user.id]
      }
      socketIo.sockets.emit('onlineUsers', onlineUserList)
    })

    socket.on('join', async ({ roomId }) => {
      console.log('roomId', roomId)
      await socket.join(roomId)
      conversationList[roomId] = socket.id
      socketIo.in(roomId).emit('conversationList', conversationList)
      console.log('conversationList', conversationList)
    })

    socket.on('sendMessage', async message => {
      await insetMessages(message)
      socket.to(message.roomId).emit('receiverMessage', message)
    })

    socket.on('sendValidateMessage', message => {
      socket.to(message.roomId).emit('receiveValidateMessage', message)
      insertValidateMessage(message)
    })

    socket.on('agreeFriendApply', data => {
      const { senderId, friendId, roomId } = data
      addFriend({ selfId: senderId, friendId })
      socket.to(roomId).emit('receiveAgreeFriendApply', data)
      updateMessagesStatus({
        roomId,
        senderId,
        receiverId: friendId,
        status: VALIDATE_MESSAGE_STATUS.agree
      })
    })
  })
}

module.exports = createSocket
