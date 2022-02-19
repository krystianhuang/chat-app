import Router from './router'
import React, { useCallback, useEffect, useState } from 'react'
import { getLocal, setLocal } from './utils'
import request from './services/request'
import './assets/css/index.scss'

export const UserContext = React.createContext({})

function App() {
  const [user, setUser] = useState({})
  const [systemUsers, setSystemUsers] = useState([])

  useEffect(() => {
    if (getLocal('user')) setUser(getLocal('user'))

    const getSystemUsers = async () => {
      const res = await request({ url: '/system/users' })
      setSystemUsers(res.data)
    }
    getSystemUsers()
  }, [])

  const setUserInfo = useCallback(user => {
    setUser(user)
    setLocal('user', user)
  }, [])

  return (
    <UserContext.Provider value={{ user, systemUsers, setUserInfo }}>
      <div className='app'>
        <Router />
      </div>
    </UserContext.Provider>
  )
}

export default App
