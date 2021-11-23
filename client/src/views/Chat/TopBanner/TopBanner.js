import React from 'react'
import './topBanner.scss'

const TopBanner = () => {
  return (
    <div className='top-banner'>
      <span className='item title'>Friends</span>
      <span className='item active'>Online</span>
      <span className='item'>All</span>
      <span className='item'>Add Friend</span>
    </div>
  )
}

export default React.memo(TopBanner)
