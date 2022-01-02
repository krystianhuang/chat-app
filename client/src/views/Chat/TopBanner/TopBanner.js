import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../../App'
import './topBanner.scss'

const TopBanner = ({ active, onClick }) => {
  const history = useNavigate()
  const { user } = useContext(UserContext)

  const logout = () => {
    localStorage.removeItem('user')
    history('/login')
  }

  const getClassName = v => {
    return `item ${active === v ? 'active' : ''}`
  }

  const onTabClick = v => {
    onClick(v)
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
      <div onClick={logout} className='user-avatar'>
        <img className='avatar' src={user.avatar} alt='avatar' />
      </div>
    </div>
  )
}

export default React.memo(TopBanner)
