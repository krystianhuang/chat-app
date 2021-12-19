import React, { useContext } from 'react'
import { Skeleton } from 'antd'
import { UserContext } from '../../../App'
import { IMG_BASE_URL } from '../../../constants/constants'

const MsgList = ({ loading, msgList }) => {
  const { user } = useContext(UserContext)

  return (
    <div className='msg-list'>
      <Skeleton loading={loading}>
        {msgList.map(v =>
          v.senderId === user.id ? (
            <div key={v._id} className='self-message'>
              <span className='sender-message-content'>{v.message}</span>
              <img
                src={IMG_BASE_URL + v.senderAvatar}
                className='message-avatar'
              />
            </div>
          ) : (
            <div key={v._id} className='other-message'>
              <img
                src={IMG_BASE_URL + v.senderAvatar}
                className='message-avatar'
              />
              <span className='other-message-content'>{v.message}</span>
            </div>
          )
        )}
      </Skeleton>
    </div>
  )
}

export default React.memo(MsgList)
