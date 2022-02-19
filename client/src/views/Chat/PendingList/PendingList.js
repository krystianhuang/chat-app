import { useContext } from 'react'
import { message, Modal } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { ChatContext, eventEmitter } from '../'
import request from '../../../services/request'
import './pendingList.scss'

const PendingList = ({ list, updatePendingList }) => {
  const { socket, getFriends } = useContext(ChatContext)

  const reload = (id, index) => {
    updatePendingList(
      list.filter((v, i) => {
        if (i === index) {
          if (v._id === id) {
            return false
          }
          return true
        }
        return true
      })
    )
  }

  const toAgree = async (
    { _id, roomId, senderId, receiverId, senderUserName },
    index
  ) => {
    try {
      await request({
        url: '/friend/add',
        method: 'post',
        data: {
          senderId,
          receiverId
        }
      })
      reload(_id, index)
      getFriends()

      socket.emit('agreeFriendApply', {
        id: _id,
        senderId,
        receiverId,
        roomId,
        senderUserName
      })
      message.success(
        `You have agreed to ${senderUserName}'s friend application`
      )
    } catch (error) {
      console.log('error', error)
      message.error(`${error?.data?.msg || 'Add failed'}!`)
    }
  }

  const toDisAgree = (
    { _id, roomId, senderId, receiverId, senderUserName },
    index
  ) => {
    Modal.confirm({
      content: `Are you sure you want to reject ${senderUserName}'s friends application`,
      onOk: () => {
        socket.emit('disAgreeFriendApply', {
          id: _id,
          senderId,
          receiverId,
          roomId,
          senderUserName
        })
        reload(_id, index)
      }
    })
  }

  return (
    <div className='pending-list'>
      {list.length ? (
        list.map((v, i) => (
          <div className='pending-item' key={i}>
            <div>
              <img className='avatar-img' src={v.senderAvatar} alt='' />
              <span className={`status`}></span>
              <span className='name'>{v.senderUserName}</span>
            </div>

            <div className='action-wrapper'>
              <CheckOutlined
                onClick={() => toAgree(v, i)}
                className='action-icon aggree'
              />

              <CloseOutlined
                onClick={() => toDisAgree(v, i)}
                className='action-icon disAgree'
              />
            </div>
          </div>
        ))
      ) : (
        <div className='none-friend-tip'>No friend application</div>
      )}
    </div>
  )
}

export default PendingList
