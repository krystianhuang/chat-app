import { Input, Button } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../index'
import { getLocal } from '../../../utils'
import './chatWindow.scss'

const ChatWindow = ({ roomId }) => {
  const { socket } = useContext(ChatContext)

  const [chatMsg, setChatMsg] = useState('')

  useEffect(() => {
    socket.on('receiverMessage', msgs => {
      console.log('msgs', msgs)
    })
  }, [])

  const onSend = () => {
    const msg = {
      roomId,
      senderId: getLocal('user').id,
      senderName: getLocal('user').username,
      message: chatMsg,
      messageType: 'text'
    }

    socket.emit('sendMessage', msg)
  }

  return (
    <>
      <Input onChange={e => setChatMsg(e.target.value)} />
      <Button onClick={onSend}>Send</Button>
    </>
  )
}

export default ChatWindow
