import ChatList from './ChatList/ChatList'
import TopBanner from './TopBanner/TopBanner'
import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import './index.scss'

export const ChatContext = React.createContext({})

const Chat = () => {
  const socketRef = useRef()
  const [, update] = useState({})

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
    <ChatContext.Provider value={{ socket: socketRef.current }}>
      <div className='chat-wrapper'>
        <ChatList />
        <div className='chat-container'>
          <TopBanner />
        </div>
      </div>
    </ChatContext.Provider>
  )
}

export default Chat
