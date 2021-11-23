import ChatList from './ChatList/ChatList'
import TopBanner from './TopBanner/TopBanner'
import './index.scss'

const Chat = () => {
  return (
    <div className='chat-wrapper'>
      <ChatList />
      <div className='chat-container'>
        <TopBanner />
      </div>
    </div>
  )
}

export default Chat
