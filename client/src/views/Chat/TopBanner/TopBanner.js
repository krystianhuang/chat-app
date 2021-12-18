import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../../App'
import { IMG_BASE_URL } from '../../../constants/constants'
import './topBanner.scss'

const TopBanner = () => {
  const history = useNavigate()
  const { user } = useContext(UserContext)

  const logout = () => {
    localStorage.removeItem('user')
    history('/login')
  }

  return (
    <div className='top-banner'>
      <div>
        <span className='item title'>Friends</span>
        <span className='item active'>Online</span>
        <span className='item'>All</span>
        <span className='item'>Add Friend</span>
      </div>
      <div onClick={logout} className='user-avatar'>
        <img className='avatar' src={IMG_BASE_URL + user.avatar} />
      </div>
    </div>
  )
}

export default React.memo(TopBanner)
