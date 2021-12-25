import React, { useContext, useState } from 'react'
import { Skeleton, Modal } from 'antd'
import { PhotoProvider, PhotoConsumer } from 'react-photo-view'
import { UserContext } from '../../../App'
import { IMG_BASE_URL, MSG_SPLIT_STR } from '../../../constants/constants'
import { DashOutlined } from '@ant-design/icons'
import request from '../../../services/request'
import 'react-photo-view/dist/index.css'

const getImgUrl = msg => {
  if (msg) {
    return msg.split(MSG_SPLIT_STR + 'url:')[1]
  }
}

const getText = msg => {
  if (msg) {
    return msg.split(MSG_SPLIT_STR + 'url:')[0]
  }
}

const MsgList = ({ loading, msgList, onDeleteMessage }) => {
  const { user } = useContext(UserContext)
  const [isShowAction, setIsShowAction] = useState(false)

  const deleteMessage = async id => {
    Modal.confirm({
      content: 'Confirm Delete?',
      onOk: async () => {
        try {
          const res = await request({
            url: `/message/${id}`,
            method: 'delete'
          })
          onDeleteMessage(id)
          setIsShowAction(false)
        } catch (error) {}
      }
    })
  }

  const renderSelfMessage = v => {
    return v.messageType === 'img' && getImgUrl(v.message) ? (
      <>
        {getText(v.message) ? (
          <span className='sender-message-content'>{getText(v.message)}</span>
        ) : null}
        <img src={IMG_BASE_URL + v.senderAvatar} className='message-avatar' />
        <div className='img-text-msg'>
          <div className='send-message-wrapper'>
            <PhotoConsumer src={IMG_BASE_URL + getImgUrl(v.message)}>
              <img
                src={IMG_BASE_URL + getImgUrl(v.message)}
                className='sender-message-img'
              />
            </PhotoConsumer>
          </div>
        </div>
      </>
    ) : (
      <>
        <span className='sender-message-content'>{v.message}</span>
        <img src={IMG_BASE_URL + v.senderAvatar} className='message-avatar' />
      </>
    )
  }

  const rendeOtherMessage = v => {
    return v.messageType === 'img' && getImgUrl(v.message) ? (
      <>
        <img src={IMG_BASE_URL + v.senderAvatar} className='message-avatar' />
        {getText(v.message) ? (
          <span className='other-message-content'>{getText(v.message)}</span>
        ) : null}
        <div className='img-text-msg'>
          <div className='other-message-wrapper'>
            <PhotoConsumer src={IMG_BASE_URL + getImgUrl(v.message)}>
              <img
                src={IMG_BASE_URL + getImgUrl(v.message)}
                className='other-message-img'
              />
            </PhotoConsumer>
          </div>
        </div>
      </>
    ) : (
      <>
        <img src={IMG_BASE_URL + v.senderAvatar} className='message-avatar' />
        <span className='other-message-content'>{v.message}</span>
      </>
    )
  }

  const renderActions = (v, className) => {
    return isShowAction ? (
      <div className={`drop-down ${className}`}>
        <div onClick={() => deleteMessage(v._id)} className='action-item'>
          Delete Message
        </div>
      </div>
    ) : null
  }

  return (
    <div className='msg-list'>
      <PhotoProvider>
        <Skeleton loading={loading}>
          {msgList.map(v =>
            v.senderId === user.id ? (
              <div key={v._id} className='self-message'>
                <div className='self-actions'>
                  <DashOutlined
                    onClick={() => setIsShowAction(!isShowAction)}
                  />
                  {renderActions(v, 'self-drop-down')}
                </div>
                {renderSelfMessage(v)}
              </div>
            ) : (
              <div key={v._id} className='other-message'>
                {rendeOtherMessage(v)}
                <div className='other-actions'>
                  <DashOutlined
                    onClick={() => setIsShowAction(!isShowAction)}
                  />
                  {renderActions(v, 'other-drop-down')}
                </div>
              </div>
            )
          )}
        </Skeleton>
      </PhotoProvider>
    </div>
  )
}

export default React.memo(MsgList)
