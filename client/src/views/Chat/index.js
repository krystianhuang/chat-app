import ChatList from './ChatList/ChatList'
import TopBanner from './TopBanner/TopBanner'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import ChatWindow from './ChatWindow/ChatWindow'
import './index.scss'

export const ChatContext = React.createContext({})

const Chat = () => {
  const socketRef = useRef()
  const [, update] = useState({})

  const [roomId, updateRoomId] = useState('')
  const [currentChatFriend, updateCurrentChatFriend] = useState({})

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

  return (
    <ChatContext.Provider
      value={{
        socket: socketRef.current,
        roomId,
        currentChatFriend,
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
              <TopBanner />
            </>
          )}
        </div>
      </div>
    </ChatContext.Provider>
  )
}

export default Chat
