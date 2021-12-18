import { useCallback, useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../App'
import request from '../../../services/request'
import { getLocal, sort } from '../../../utils'
import { ChatContext } from '../index'
import './chatList.scss'

const ChatList = () => {
  const { socket, setRoomId, setCurrentChatFriend } = useContext(ChatContext)

  const { user } = useContext(UserContext)

  const [friends, setFriends] = useState([])

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
    const roomId = sort(user.id, v.id)
    socket.emit('join', {
      roomId
    })
    setRoomId(roomId)
    setCurrentChatFriend(v)
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
      </div>
    </div>
  )
}

export default ChatList
