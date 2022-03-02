import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { message, Modal, Tooltip } from 'antd'
import { UserContext } from '../../../App'
import request from '../../../services/request'
import { getLocal, sort } from '../../../utils'
import { ChatContext } from '../index'
import { eventEmitter } from '../index'
import { useNavigate } from 'react-router-dom'
import './chatList.scss'

const ChatList = () => {
  const history = useNavigate()
  const { socket, onlineUsers, setRoomId, setCurrentChatFriend } =
    useContext(ChatContext)

  const { user } = useContext(UserContext)

  const [chatList, setChatList] = useState([])

  const getChatList = useCallback(async () => {
    const result = await request({
      url: '/chat/list',
      data: {
        userId: getLocal('user')?.id
      }
    })
    setChatList(result.data)
  }, [])

  useEffect(() => {
    getChatList()
    eventEmitter.on('getChatList', getChatList)
  }, [getChatList])

  const onFriendClick = v => {
    const roomId = sort(user.id, v.receiverId)
    socket.emit('join', {
      roomId
    })
    setRoomId(roomId)
    setCurrentChatFriend({
      avatar: v.receiverAvatar,
      id: v.receiverId,
      username: v.receiverName
    })
  }

  const onDelete = (e, v) => {
    e.stopPropagation()
    Modal.confirm({
      content: 'Are you sure you want to delete this Conversation?',
      centered: true,
      onOk: async () => {
        try {
          await request({
            url: '/chat/deleteConversation',
            method: 'delete',
            data: {
              senderId: v.senderId,
              receiverId: v.receiverId
            }
          })
          getChatList()
          message.success('Successfully deleted')
        } catch (error) {
          message.error('Failed to delete')
        }
      }
    })
  }

  const isOnline = useMemo(() => v => onlineUsers[v.receiverId], [onlineUsers])

  return (
    <div className='chat-list'>
      <div className='title'>CONVERSATION LIST</div>

      {chatList.map(v => (
        <div
          onClick={() => onFriendClick(v)}
          className='chat-item'
          key={v.receiverId}
        >
          <img
            className='avatar-img'
            src={v.receiverAvatar}
            alt=''
            onClick={e => {
              e.stopPropagation()
              history(`/user/${v.receiverId}`)
            }}
          />
          <span className='user-name'>{v.receiverName}</span>
          <Tooltip title={isOnline(v) ? 'Online' : 'Offline'}>
            <span
              className={`chat-status ${isOnline(v) ? 'online' : 'offline'} `}
            ></span>
          </Tooltip>

          <CloseOutlined className='close-icon' onClick={e => onDelete(e, v)} />
        </div>
      ))}
    </div>
  )
}

export default ChatList
