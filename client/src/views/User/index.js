import { Button, DatePicker, Input, message, Radio } from 'antd'
import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import request from '../../services/request'
import { SEX } from './constants'
import { UserContext } from '../../App'
import Header from '../../components/Header'
import './index.scss'

const UserInfo = () => {
  const { user } = useContext(UserContext)

  const [originUserInfo, setOriginUserInfo] = useState({})
  const [userInfo, setUserInfo] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    if (!id) return

    const getUserInfo = async () => {
      try {
        const result = await request({
          url: '/user/userInfo/' + id
        })
        const user = { ...result.data }
        user.userId = user._id
        delete user._id
        setUserInfo(user)
        setOriginUserInfo(user)
      } catch (error) {}
    }

    getUserInfo()
  }, [id])

  const onEditClick = () => {
    setIsEditing(true)
  }

  const updateUserInfo = (key, value) => {
    setUserInfo(user => ({ ...user, [key]: value }))
  }

  const onSave = async () => {
    try {
      await request({
        url: '/user/userInfo',
        data: userInfo,
        method: 'put'
      })
      message.success('User infomation update successfully')
      setOriginUserInfo(userInfo)
      setIsEditing(false)
    } catch (error) {
      message.error('User infomation update failed')
      setIsEditing(false)
    }
  }

  const renderUserInfo = () => {
    return (
      <div className='user-info'>
        <img src={userInfo.avatar} className='avatar-img' alt='avatar' />

        <div className='right'>
          <div className='item'>UserName: {userInfo.username}</div>
          <div className='item'>Sex: {SEX[userInfo.sex]}</div>
          <div className='item'>
            Birthday:
            {userInfo.birthday
              ? moment.unix(userInfo.birthday).format('YYYY-MM-DD')
              : null}
          </div>
          <div className='item'>Hobby: {userInfo.hobby}</div>
          <div className='item'>Description: {userInfo.description}</div>
        </div>
      </div>
    )
  }

  return (
    <div className='user-info-wrapper'>
      <div className='user-info-container'>
        {isEditing ? (
          <div className='edit-user-info'>
            <img
              src={userInfo.avatar}
              className='edit-avatar-img'
              alt='avatar'
            />

            <div className='right'>
              <div className='item'>
                <span className='label'>Username:</span>
                <Input
                  className='input'
                  value={userInfo.username}
                  onChange={e => updateUserInfo('username', e.target.value)}
                />
              </div>

              <div className='item'>
                <span className='label'>Password:</span>
                <Input
                  type='password'
                  className='input'
                  value={userInfo.password}
                  onChange={e => updateUserInfo('password', e.target.value)}
                />
              </div>

              <div className='item'>
                <span className='label'>Sex:</span>
                <Radio.Group
                  className='input'
                  onChange={e => updateUserInfo('sex', e.target.value)}
                  value={userInfo.sex}
                >
                  <Radio value={0}>Man</Radio>
                  <Radio value={1}>Woman</Radio>
                </Radio.Group>
              </div>

              <div className='item'>
                <span className='label'>Birthday:</span>
                <DatePicker
                  forma
                  w
                  className='input'
                  value={
                    userInfo.birthday
                      ? moment(moment.unix(userInfo.birthday))
                      : undefined
                  }
                  onChange={v => {
                    updateUserInfo('birthday', moment(v).unix())
                  }}
                />
              </div>

              <div className='item'>
                <span className='label'>Hobby:</span>
                <Input
                  className='input'
                  placeholder='Multiple inputs are separated by commas'
                  value={userInfo.hobby}
                  onChange={e => updateUserInfo('hobby', e.target.value)}
                />
              </div>

              <div className='item'>
                <span className='label'>Description:</span>
                <Input
                  className='input'
                  value={userInfo.description}
                  onChange={e => updateUserInfo('description', e.target.value)}
                />
              </div>
            </div>
          </div>
        ) : (
          renderUserInfo()
        )}

        {isEditing ? (
          <div className='action-wrapper'>
            <Button className='save' type='primary' onClick={onSave}>
              Save
            </Button>
            <Button
              onClick={() => {
                setUserInfo(originUserInfo)
                setIsEditing(false)
              }}
            >
              Cancel
            </Button>
          </div>
        ) : id === user.id ? (
          <div className='action-wrapper'>
            <Button onClick={onEditClick} type='primary'>
              Modify Personal Infomation
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default UserInfo
