import { Tooltip } from 'antd'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { UserContext } from '../../../App'
import request from '../../../services/request'
import { getLocal, sort } from '../../../utils'
import { ChatContext, eventEmitter } from '../index'
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

  // useEffect(() => {
  //   getFrends()
  //   eventEmitter.on('getFriends', getFrends)
  // }, [getFrends])

  const onFriendClick = v => {
    const roomId = sort(user.id, v.id)
    socket.emit('join', {
      roomId
    })
    setRoomId(roomId)
    setCurrentChatFriend(v)
  }

  const isOnline = useMemo(() => v => onlineUsers[v.id], [onlineUsers])

  return (
    <div className='chat-list'>
      <div className='friend-list'>
        {friends.map(v => (
          <div
            onClick={() => onFriendClick(v)}
            className='friend-item'
            key={v.id}
          >
            <img className='avatar-img' src={v.avatar} alt='' />
            <span>{v.username}</span>
            <Tooltip title={isOnline(v) ? 'Online' : 'Offline'}>
              <span
                className={`friend-status ${
                  isOnline(v) ? 'online' : 'offline'
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
