import Register from '../views/Register'
import Login from '../views/Login'
import Home from '../views/Home'
import { Routes, Route } from 'react-router-dom'
import Chat from '../views/Chat'
import User from '../views/User'

const Router = () => {
  return (
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/chat' element={<Chat />} />
      <Route path='/user/:id' element={<User />} />
    </Routes>
  )
}

export default Router
