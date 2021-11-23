import Register from '../views/Register'
import Login from '../views/Login'
import Home from '../views/Home'
import { Routes, Route } from 'react-router-dom'
import Chat from '../views/Chat'

const Router = () => {
  return (
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/chat' element={<Chat />} />
    </Routes>
  )
}

export default Router
