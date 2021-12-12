import { Input, Button } from 'antd'
import { useCallback, useContext, useEffect, useState } from 'react'
import { ChatContext } from '../index'
import { UserContext } from '../../../App'
import { getLocal } from '../../../utils'
import request from '../../../services/request'
import './chatWindow.scss'

const ChatWindow = () => {
  const { roomId, socket, currentChatFriend } = useContext(ChatContext)
  const { user } = useContext(UserContext)

  const [chatMsg, setChatMsg] = useState('')
  const [msgList, setMsgList] = useState([])

  useEffect(() => {
    socket.on('receiverMessage', msg => {
      setMsgList(v => [...v, msg])
    })
  }, [])

  const getMsgList = useCallback(async () => {
    const res = await request({
      url: '/message/recent',
      data: {
        roomId,
        page: 1,
        pageSize: 100
      }
    })
    setMsgList(res.data)
  }, [])

  useEffect(() => {
    getMsgList()
  }, [getMsgList])

  const onSend = () => {
    const msg = {
      roomId,
      senderId: getLocal('user').id,
      senderName: getLocal('user').username,
      message: chatMsg,
      messageType: 'text'
    }

    socket.emit('sendMessage', msg)
    setMsgList([...msgList, msg])
  }

  return (
    <div className='chat-window'>
      <div className='chat-top-banner'>
        <span className='chat-user-name'>{currentChatFriend.username}</span>
      </div>

      <div className='msg-list'>
        {msgList.map(v => (
          <div
            key={v._id}
            className={
              v.senderId === user.id ? 'self-message' : 'other-message'
            }
          >
            {v.message}
          </div>
        ))}
      </div>

      <div className='send-container'>
        <Input
          size='large'
          className='chat-input'
          onPressEnter={onSend}
          onChange={e => setChatMsg(e.target.value)}
        />
      </div>
    </div>
  )
}

export default ChatWindow
