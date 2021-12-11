import { useCallback, useContext, useEffect, useState } from 'react'
import request from '../../../services/request'
import { getLocal } from '../../../utils'
import { ChatContext } from '../index'
import ChatWindow from '../ChatWindow/ChatWindow'
import './chatList.scss'

const ChatList = () => {
  const { socket } = useContext(ChatContext)

  const [friends, setFriends] = useState([])
  const [currentFriend, setCurrentFriend] = useState({})
  const [roomId, setRoomId] = useState('')

  const getFrends = useCallback(async () => {
    try {
      const user = getLocal('user') || {}
      const res = await request({
        url: '/friend/list',
        data: { selfId: user.id }
      })
      setFriends(res.data)
    } catch (error) {}
  }, [])

  useEffect(() => {
    getFrends()
  }, [])

  const onFriendClick = v => {
    const roomId = getLocal('user').id + v.id
    socket.emit('join', {
      roomId
    })
    setRoomId(roomId)
    setCurrentFriend(v)
  }

  return (
    <div className='chat-list'>
      <div className='friend-list'>
        {friends.map(v => (
          <div
            onClick={() => onFriendClick(v)}
            className='friend-item'
            key={v.id}
          >
            {v.username}
          </div>
        ))}

        {currentFriend.id ? <ChatWindow roomId={roomId} /> : null}
      </div>
    </div>
  )
}

export default ChatList
