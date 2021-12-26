import { Tooltip } from 'antd'
import { useCallback, useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../App'
import { IMG_BASE_URL } from '../../../constants/constants'
import request from '../../../services/request'
import { getLocal, sort } from '../../../utils'
import { ChatContext } from '../index'
import './chatList.scss'

const ChatList = () => {
  const { socket, onlineUsers, setRoomId, setCurrentChatFriend } =
    useContext(ChatContext)

  const { user } = useContext(UserContext)

  const [friends, setFriends] = useState([])

  const getFrends = useCallback(async () => {
    try {
      const user = getLocal('user') || {}
      const res = await request({
        url: '/friend/list',
        data: { selfId: user.id }
      })
      console.log('res', res.data)
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

  console.log('onlineUsers', onlineUsers)

  return (
    <div className='chat-list'>
      <div className='friend-list'>
        {friends.map(v => (
          <div
            onClick={() => onFriendClick(v)}
            className='friend-item'
            key={v.id}
          >
            <img className='avatar-img' src={IMG_BASE_URL + v.avatar} />
            <span>{v.username}</span>
            <Tooltip title={onlineUsers[v.id] ? 'Online' : 'Offline'}>
              <span
                className={`friend-status ${
                  onlineUsers[v.id] ? 'online' : 'offline'
                } `}
              ></span>
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatList
