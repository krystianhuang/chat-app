import { Button, Input, message } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { ChatContext } from '..'
import { UserContext } from '../../../App'
import { sort } from '../../../utils'
import './addFriend.scss'

const AddFriend = () => {
  const { user, systemUsers } = useContext(UserContext)
  const { socket } = useContext(ChatContext)
  const [val, setVal] = useState('')

  const onSend = async () => {
    socket.emit('sendValidateMessage', {
      senderId: user.id,
      senderUserName: user.username,
      senderAvatar: user.avatar,
      roomId: sort(systemUsers[0]?._id, val),
      receiverId: val,
      validateType: 0
    })
    message.success('Message sent successsfully')
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
          <Button onClick={onSend} disabled={!val} type='primary'>
            Send Friend Request
          </Button>
        }
      />
    </div>
  )
}

export default AddFriend
