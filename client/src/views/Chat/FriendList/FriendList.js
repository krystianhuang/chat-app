import { Tooltip, Menu, Dropdown, Modal } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import { useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../../App'
import request from '../../../services/request'
import { sort } from '../../../utils'
import { ChatContext, eventEmitter } from '../index'
import './friendList.scss'

const Friends = ({ friends, setFriends }) => {
  const history = useNavigate()

  const { socket, onlineUsers, setRoomId, setCurrentChatFriend } =
    useContext(ChatContext)

  const { user } = useContext(UserContext)

  const onFriendClick = async v => {
    const roomId = sort(user.id, v.id)
    socket.emit('join', {
      roomId
    })
    setRoomId(roomId)
    setCurrentChatFriend(v)
    await request({
      url: '/chat/addConversation',
      method: 'post',
      data: {
        senderId: user.id,
        receiverId: v.id,
        receiverAvatar: v.avatar,
        receiverName: v.username,
        roomId: sort(user.id, v.id)
      }
    })
    eventEmitter.emit('getChatList')
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
          setFriends(friends.filter(f => v.id !== v.id))
        }
      })
    }
  }

  const isOnline = useMemo(() => v => onlineUsers[v.id], [onlineUsers])

  return (
    <div className='friend-list'>
      {friends.map(v => (
        <div
          onClick={() => onFriendClick(v)}
          className='friend-item'
          key={v.id}
        >
          <div>
            <img
              className='avatar-img'
              src={v.avatar}
              alt='avatar'
              onClick={e => {
                e.stopPropagation()
                history(`/user/${v.id}`)
              }}
            />
            <span>{v.username}</span>
            <Tooltip title={isOnline(v) ? 'Online' : 'Offline'}>
              <span
                className={`friend-status ${
                  isOnline(v) ? 'online' : 'offline'
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
