import { Button, Input, message } from 'antd'
import { useContext, useState } from 'react'
import { ChatContext } from '..'
import { UserContext } from '../../../App'
import { sort } from '../../../utils'
import request from '../../../services/request'
import UserItem from '../UserItem/UserItem'
import './addFriend.scss'

const AddFriend = () => {
  const { user, systemUsers } = useContext(UserContext)
  const { socket } = useContext(ChatContext)
  const [val, setVal] = useState('')
  const [users, setUsers] = useState([])

  const onSend = async v => {
    socket.emit('sendValidateMessage', {
      senderId: user.id,
      senderUserName: user.username,
      senderAvatar: user.avatar,
      roomId: sort(systemUsers[0]?._id, v._id),
      receiverId: v._id,
      validateType: 0
    })
    message.success('Message sent successsfully')
  }

  const onQuery = async () => {
    const result = await request({
      url: '/user/findUsers',
      data: {
        username: val
      }
    })
    setUsers(result.data)
  }

  return (
    <div className='add-friend-wrapper'>
      <h2 className='title'>Add Friend</h2>
      <div className='desc'>
        You can add a friend with their Discord Tag. It's cAsE sEnSitIvE!
      </div>
      <Input
        value={val}
        placeholder='Enter a Username'
        onChange={e => setVal(e.target.value)}
        className='add-input'
        size='large'
        addonAfter={
          <Button onClick={onQuery} disabled={!val} type='primary'>
            Send Friend Request
          </Button>
        }
      />

      {users.map(user => (
        <UserItem key={user._id} addFriend={onSend} user={user} />
      ))}
    </div>
  )
}

export default AddFriend
