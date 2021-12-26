import { Button, Input } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { ChatContext } from '..'
import { UserContext } from '../../../App'
import request from '../../../services/request'
import { sort } from '../../../utils'
import './addFriend.scss'

const AddFriend = () => {
  const { user } = useContext(UserContext)
  const { socket } = useContext(ChatContext)
  const [val, setVal] = useState('')

  const onSend = async () => {
    socket.emit('sendValidateMessage', {
      senderId: user.id,
      roomId: sort(user.id, val),
      reciverId: val,
      validateType: 0
    })
    // const res = await request({
    //   url: '/friend/add',
    //   method: 'post',
    //   seselfId: user.id,
    //   friendId: val
    // })
    // console.log('res', res)
  }

  useEffect(() => {
    socket.on('receiveValidateMessage', message => {
      console.log('message', message)
    })
  }, [])

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
