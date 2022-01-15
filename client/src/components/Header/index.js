import { Link } from 'react-router-dom'
import './index.scss'

const Header = () => {
  return (
    <div className='header-wrapper'>
      <Link to='/home' className='linl'>
        Home
      </Link>

      <Link to='/chat' className='link'>
        Chat
      </Link>
    </div>
  )
}

export default Header
