import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import Socket from '../../utils/socket'
import { Input, Button } from 'antd'

let socket

const SocketComponent = () => {
  const [msgValue, setMsgValue] = useState('')
  const [messageList, setMessageList] = useState([])

  useEffect(() => {
    const initSocket = () => {
      if (!socket) {
        socket = io('http://localhost:3002')
      }
      console.log('socket', socket)

      socket.emit('join', {
        roomId: '61a4d9b0a2698bb389f8ae361a4d9b0a2698bb389f8ae36'
      })

      socket.on('receiverMessage', msgs => {
        console.log('msgs', msgs)
        setMessageList(v => [...v, msgs])
      })
    }

    initSocket()
  }, [])

  const sendMessage = async () => {
    const msg = {
      roomId: '61a4d9b0a2698bb389f8ae361a4d9b0a2698bb389f8ae36',
      senderId: '61a4d55d23993af3886f1069',
      senderName: 'test',
      message: msgValue,
      messageType: 'text'
    }

    socket.emit('sendMessage', msg)
    setMessageList([...messageList, msg])
  }

  return (
    <>
      <Input onChange={e => setMsgValue(e.target.value)} />

      <Button onClick={sendMessage}>Send Message</Button>

      {messageList.map(v => (
        <div key={v._id}>{v.message}</div>
      ))}
    </>
  )
}

export default SocketComponent
