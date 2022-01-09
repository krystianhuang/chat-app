import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../../App'
import { ChatContext } from '../index'
import { Menu, Dropdown } from 'antd'
import './topBanner.scss'

const TopBanner = ({ active, onClick }) => {
  const history = useNavigate()
  const { user } = useContext(UserContext)
  const { socket } = useContext(ChatContext)

  const logout = () => {
    socket.emit('offline', { id: user.id })
    localStorage.removeItem('user')
    history('/login')
  }

  const getClassName = v => {
    return `item ${active === v ? 'active' : ''}`
  }

  const onTabClick = v => {
    onClick(v)
  }

  const onMenuClick = e => {
    if (e.key === 'logout') {
      logout()
    }
  }

  return (
    <div className='top-banner'>
      <div>
        <span
          onClick={() => onTabClick('friends')}
          className={getClassName('friends')}
        >
          Friends
        </span>
        <span
          onClick={() => onTabClick('online')}
          className={getClassName('online')}
        >
          Online
        </span>
        <span
          onClick={() => onTabClick('pending')}
          className={getClassName('pending')}
        >
          Pending
        </span>
        <span onClick={() => onTabClick('add')} className={getClassName('add')}>
          Add Friend
        </span>
      </div>

      <Dropdown
        overlayClassName='actions-drop-down'
        overlay={
          <Menu onClick={e => onMenuClick(e)}>
            <Menu.Item key='profile'>Profile</Menu.Item>
            <Menu.Item key='logout'>Logout</Menu.Item>
          </Menu>
        }
        trigger={['click']}
        placement='bottomCenter'
      >
        <div className='user-avatar'>
          <img className='avatar' src={user.avatar} alt='avatar' />
        </div>
      </Dropdown>
    </div>
  )
}

export default React.memo(TopBanner)
