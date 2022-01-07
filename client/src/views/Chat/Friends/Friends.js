import { Tooltip, Menu, Dropdown, Modal } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import { useCallback, useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../App'
import request from '../../../services/request'
import { getLocal, sort } from '../../../utils'
import { ChatContext, eventEmitter } from '../index'
import './friends.scss'

const Friends = () => {
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
      setFriends(res.data)
    } catch (error) {}
  }, [])

  useEffect(() => {
    getFrends()
    eventEmitter.on('getFriends', getFrends)
  }, [getFrends])

  const onFriendClick = v => {
    const roomId = sort(user.id, v.id)
    socket.emit('join', {
      roomId
    })
    setRoomId(roomId)
    setCurrentChatFriend(v)
  }

  const onMenuClick = async (e, v) => {
    e.domEvent.stopPropagation()

    if (e.key === 'delete') {
      Modal.confirm({
        content: 'Are you sure your want to delete this friend',
        onOk: async () => {
          await request({
            url: '/friend/friends',
            method: 'delete',
            data: {
              senderId: user.id,
              receiverId: v.id
            }
          })
          setFriends(friends => friends.filter(f => v.id !== v.id))
        }
      })
    }
  }

  return (
    <div className='friend-list'>
      {friends.map(v => (
        <div
          onClick={() => onFriendClick(v)}
          className='friend-item'
          key={v.id}
        >
          <div>
            <img className='avatar-img' src={v.avatar} alt='' />
            <span>{v.username}</span>
            <Tooltip title={onlineUsers[v.id] ? 'Online' : 'Offline'}>
              <span
                className={`friend-status ${
                  onlineUsers[v.id] ? 'online' : 'offline'
                } `}
              />
            </Tooltip>
          </div>

          <div className='actions'>
            <Dropdown
              overlayClassName='actions-drop-down'
              overlay={
                <Menu onClick={e => onMenuClick(e, v)}>
                  <Menu.Item key='delete'>Remove Friend</Menu.Item>
                </Menu>
              }
              trigger={['click']}
              placement='bottomLeft'
            >
              <div className='icon-box' onClick={e => e.stopPropagation()}>
                <MoreOutlined className='more-icon' />
              </div>
            </Dropdown>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Friends
