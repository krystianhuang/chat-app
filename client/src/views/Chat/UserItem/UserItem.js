import { Card, Avatar, Tooltip, Popover } from 'antd'
import { PlusOutlined, WechatOutlined, CloseOutlined } from '@ant-design/icons'
import './userItem.scss'

const { Meta } = Card

const UserItem = ({ user, goChat, disLike, addFriend }) => {
  return (
    <Card
      className='item'
      style={{ width: 300, marginTop: 16 }}
      actions={[
        goChat ? (
          <WechatOutlined key='chat' onClick={() => goChat(user)} />
        ) : null,

        disLike ? (
          <Tooltip key='dislike' content='Not interested'>
            <CloseOutlined onClick={() => disLike(user)} />
          </Tooltip>
        ) : null,

        <PlusOutlined key='edit' onClick={() => addFriend(user)} />
      ]}
    >
      <Meta
        avatar={<Avatar src={user.avatar} />}
        title={user.username}
        description={
          <div>
            <Popover content={user.description}>
              <div className='text'>
                <span className='label'>Description:</span> {user.description}
              </div>
            </Popover>

            <Popover content={user.hobby}>
              <div className='text'>
                <span className='label'>Hobby:</span> {user.hobby}
              </div>
            </Popover>
          </div>
        }
      />
    </Card>
  )
}

export default UserItem
