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
import { sort } from '../../utils'
import useChat from './useChat'
import PendingList from './PendingList/PendingList'
import { notification } from 'antd'
import EventEmitter from '../../utils/EventEmitter'
import {
  agreeValidateNotification,
  disAgreeValidateNotification,
  validateNotification
} from './ChatNotification/ChatNotification'
import Friends from './Friends/Friends'
import './index.scss'

export const eventEmitter = new EventEmitter()
export const ChatContext = React.createContext({})

const Chat = () => {
  const socketRef = useRef()
  const { user, systemUsers } = useContext(UserContext)
  const [, update] = useState({})

  const [roomId, updateRoomId] = useState('')
  const [currentChatFriend, updateCurrentChatFriend] = useState({})
  const [onlineUsers, setOnlineUsers] = useState({})
  const [active, setActive] = useState('')

  const { pendingList, addPendingList, updatePendingList } = useChat()

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

  useEffect(() => {
    if (!systemUsers.length) return
    systemUsers.forEach(v => {
      socketRef.current.emit('join', {
        roomId: sort(v._id, user.id)
      })
    })
  }, [systemUsers])

  useEffect(() => {
    socketRef.current.on('receiveValidateMessage', message => {
      validateNotification(message, () => {
        setActive('pending')
        notification.destroy()
      })
      addPendingList(message)
    })

    socketRef.current.on('receiveAgreeFriendApply', message => {
      eventEmitter.emit('getFriends')
      agreeValidateNotification(message)
    })

    socketRef.current.on('receiverDisAgreeFriendApply', message => {
      disAgreeValidateNotification(message)
    })
  }, [])

  const onTabClick = useCallback(v => {
    console.log('v', v)
    setActive(v)
  }, [])

  const reset = useCallback(v => {
    setRoomId('')
    setActive(v || '')
  }, [])

  return (
    <ChatContext.Provider
      value={{
        socket: socketRef.current,
        roomId,
        currentChatFriend,
        onlineUsers,
        setRoomId,
        setCurrentChatFriend,
        reset
      }}
    >
      <div className='chat-wrapper'>
        <ChatList />

        <div className='chat-container'>
          {roomId ? (
            <ChatWindow />
          ) : (
            <>
              <TopBanner active={active} onClick={onTabClick} />
              {active === 'add' ? (
                <AddFriend />
              ) : active === 'pending' ? (
                <PendingList
                  list={pendingList}
                  updatePendingList={updatePendingList}
                />
              ) : active === 'friends' ? (
                <Friends />
              ) : null}
            </>
          )}
        </div>
      </div>
    </ChatContext.Provider>
  )
}

export default Chat
