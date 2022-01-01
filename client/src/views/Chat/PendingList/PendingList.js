import { IMG_BASE_URL } from '../../../constants/constants'
import './pendingList.scss'

const PendingList = ({ list }) => {
  return (
    <div className='pending-list'>
      {list.map((v, i) => (
        <div className='pending-item' key={i}>
          <div>
            <img className='avatar-img' src={IMG_BASE_URL + v.senderAvatar} />
            <span className={`status`}></span>
            <span className='name'>{v.senderUserName}</span>
          </div>

          <div></div>
        </div>
      ))}
    </div>
  )
}

export default PendingList
