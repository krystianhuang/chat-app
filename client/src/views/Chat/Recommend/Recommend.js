import { useCallback, useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import request from '../../../services/request'
import { getLocal, sort } from '../../../utils'
import { Skeleton, Card, Avatar, message, Tooltip, Modal } from 'antd'
import { PlusOutlined, WechatOutlined, CloseOutlined } from '@ant-design/icons'
import { UserContext } from '../../../App'
import { ChatContext, eventEmitter } from '../'
import './recommend.scss'

const { Meta } = Card

const RecommendList = () => {
  const history = useNavigate()

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const { user, systemUsers } = useContext(UserContext)
  const { socket, setRoomId, setCurrentChatFriend } = useContext(ChatContext)

  const getRecommendList = useCallback(async () => {
    try {
      const { hobby, id } = getLocal('user') || {}
      const res = await request({
        url: '/friend/recommend',
        data: {
          hobby,
          userId: id
        }
      })
      setLoading(false)
      setUsers(res.data)
    } catch (error) {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getRecommendList()
  }, [getRecommendList])

  const goChat = async v => {
    const roomId = sort(user.id, v._id)
    socket.emit('join', {
      roomId
    })
    setRoomId(roomId)
    setCurrentChatFriend(v)

    // 如果是两个陌生人聊天，则保存双方的会话记录
    await request({
      url: '/chat/addConversation',
      method: 'post',
      data: {
        senderId: user.id,
        receiverId: v._id,
        receiverAvatar: v.avatar,
        receiverName: v.username,
        roomId
      }
    })

    await request({
      url: '/chat/addConversation',
      method: 'post',
      data: {
        senderId: v._id,
        receiverId: user.id,
        receiverAvatar: user.avatar,
        receiverName: user.username,
        roomId
      }
    })
    eventEmitter.emit('getChatList')
  }

  const addFriend = v => {
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

  const disLike = async v => {
    Modal.confirm({
      centered: true,
      content: 'Are you sure this person is not interested?',
      onOk: async () => {
        try {
          const res = await request({
            url: '/friend/disLike',
            method: 'put',
            data: {
              userId: user.id,
              disLikeUserId: v._id
            }
          })
          getRecommendList()
          message.success('Successful operation')
        } catch (error) {
          message.error('Failed operation')
        }
      }
    })
  }

  return (
    <div className='recommend-wrapper'>
      {loading ? (
        <Skeleton loading={loading} active></Skeleton>
      ) : (
        <>
          {users.length ? (
            <div className='recommend-list'>
              {users.map(user => (
                <Card
                  className='item'
                  key={user._id}
                  style={{ width: 300, marginTop: 16 }}
                  actions={[
                    <WechatOutlined key='chat' onClick={() => goChat(user)} />,

                    <Tooltip key='dislike' content='Not interested'>
                      <CloseOutlined onClick={() => disLike(user)} />
                    </Tooltip>,

                    <PlusOutlined key='edit' onClick={() => addFriend(user)} />
                  ]}
                >
                  <Meta
                    avatar={<Avatar src={user.avatar} />}
                    title={user.username}
                    description={
                      <div>
                        <div>description: {user.description}</div>
                        <div>hobby: {user.hobby}</div>
                      </div>
                    }
                  />
                </Card>
              ))}
            </div>
          ) : (
            <div className='none-tip'>
              No friend recommendation,try to set
              <Link className='tip' to={`/user/${user.id}`}>
                hobby
              </Link>
              information
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default RecommendList
