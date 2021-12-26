import ChatList from './ChatList/ChatList'
import TopBanner from './TopBanner/TopBanner'
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { io } from 'socket.io-client'
import ChatWindow from './ChatWindow/ChatWindow'
import { UserContext } from '../../App'
import AddFriend from './AddFriend/AddFriend'
import './index.scss'

export const ChatContext = React.createContext({})

const Chat = () => {
  const socketRef = useRef()
  const { user } = useContext(UserContext)
  const [, update] = useState({})

  const [roomId, updateRoomId] = useState('')
  const [currentChatFriend, updateCurrentChatFriend] = useState({})
  const [onlineUsers, setOnlineUsers] = useState({})
  const [active, setActive] = useState('')

  const setRoomId = useCallback(id => {
    updateRoomId(id)
  }, [])

  const setCurrentChatFriend = useCallback(v => {
    updateCurrentChatFriend(v)
  }, [])

  useEffect(() => {
    const initSocket = () => {
      if (!socketRef.current) {
        socketRef.current = io('http://localhost:3002')
        update({})
      }
    }
    initSocket()
  }, [])

  useEffect(() => {
    if (user.id) {
      socketRef.current.emit('online', { id: user.id, username: user.username })
    }
  }, [user])

  useEffect(() => {
    const getOnlineUsers = async () => {
      socketRef.current.on('onlineUsers', users => {
        setOnlineUsers(users)
      })
    }
    getOnlineUsers()
  }, [])

  const onTabClick = useCallback(v => {
    console.log('v', v)
    setActive(v)
  }, [])

  return (
    <ChatContext.Provider
      value={{
        socket: socketRef.current,
        roomId,
        currentChatFriend,
        onlineUsers,
        setRoomId,
        setCurrentChatFriend
      }}
    >
      <div className='chat-wrapper'>
        <ChatList />

        <div className='chat-container'>
          {roomId ? (
            <ChatWindow />
          ) : (
            <>
              <TopBanner onClick={onTabClick} />
              {active === 'add' ? <AddFriend /> : null}
            </>
          )}
        </div>
      </div>
    </ChatContext.Provider>
  )
}

export default Chat
