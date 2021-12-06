import { io } from 'socket.io-client'

class Socket {
  io

  constructor(options) {
    console.log('io', this.io)
    if (!this.io) {
      this.io = io('http://localhost:3002')
      this.connect(options)
    }
  }

  connect({ connect }) {
    this.io.on('connect', () => {
      connect?.()
    })
  }

  sendMessage(msg) {
    console.log('msg', msg)
    this.io.on('sendMessage', msg)
  }
}

export default Socket
