import Router from './router'
import React, { useCallback, useEffect, useState } from 'react'
import { getLocal } from './utils'
import './assets/css/index.scss'

export const UserContext = React.createContext({})

function App() {
  const [user, setUser] = useState({})

  useEffect(() => {
    if (getLocal('user')) setUser(getLocal('user'))
  }, [])

  const setUserInfo = useCallback(user => {
    setUser(user)
  }, [])

  return (
    <UserContext.Provider value={{ user, setUserInfo }}>
      <div className='app'>
        <Router />
      </div>
    </UserContext.Provider>
  )
}

export default App
