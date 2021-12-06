const { insetMessages } = require('../controllers/message')
const { Server } = require('socket.io')

const conversationList = {}

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

    socket.on('join', async ({ roomId }) => {
      console.log('roomId', roomId)
      await socket.join(roomId)
      conversationList[roomId] = socket.id
      socketIo.in(roomId).emit('conversationList', conversationList)
      console.log('conversationList', conversationList)
    })

    socket.on('sendMessage', async message => {
      const data = await insetMessages(message)
      console.log('message', message.roomId)

      socket.to(message.roomId).emit('receiverMessage', message)

      // socket.emit('receiverMessage', message)
    })
  })
}

module.exports = createSocket
