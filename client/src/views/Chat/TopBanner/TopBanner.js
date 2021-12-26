import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../../App'
import { IMG_BASE_URL } from '../../../constants/constants'
import './topBanner.scss'

const TopBanner = ({ onClick }) => {
  const history = useNavigate()
  const [active, setactive] = useState('')
  const { user } = useContext(UserContext)

  const logout = () => {
    localStorage.removeItem('user')
    history('/login')
  }

  const getClassName = v => {
    return `item ${active === v ? 'active' : ''}`
  }

  const onTabClick = v => {
    setactive(v)
    onClick(v)
  }

  return (
    <div className='top-banner'>
      <div>
        <span className={getClassName('friends')}>Friends</span>
        <span
          onClick={() => onTabClick('online')}
          className={getClassName('online')}
        >
          Online
        </span>
        <span onClick={() => onTabClick('all')} className={getClassName('all')}>
          All
        </span>
        <span onClick={() => onTabClick('add')} className={getClassName('add')}>
          Add Friend
        </span>
      </div>
      <div onClick={logout} className='user-avatar'>
        <img className='avatar' src={IMG_BASE_URL + user.avatar} />
      </div>
    </div>
  )
}

export default React.memo(TopBanner)
