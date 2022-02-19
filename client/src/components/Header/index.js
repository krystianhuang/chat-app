import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { Dropdown, Menu } from 'antd'
import { UserContext } from '../../App'
import './index.scss'

const Header = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  const logout = () => {
    localStorage.removeItem('user')
    navigate('/login', { replace: true })
  }

  const onMenuClick = e => {
    if (e.key === 'logout') {
      logout()
    }
    if (e.key === 'personal') {
      navigate('/user/' + user.id)
    }
  }

  return (
    <div className='header-wrapper'>
      <Link to='/home' className='link'>
        Home
      </Link>

      <Link to='/chat' className='link'>
        Chat
      </Link>

      <Dropdown
        overlayClassName='actions-drop-down'
        overlay={
          <Menu onClick={e => onMenuClick(e)}>
            <Menu.Item key='personal'>Personal center</Menu.Item>
            <Menu.Item key='logout'>Logout</Menu.Item>
          </Menu>
        }
        trigger={['click']}
        placement='bottomCenter'
      >
        <div className='user-avatar'>
          <img className='avatar' src={user.avatar} alt='avatar' />
          <span className='user-name'>{user.username}</span>
        </div>
      </Dropdown>
    </div>
  )
}

export default Header
