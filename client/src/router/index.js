import Register from '../views/Register'
import { Routes, Route } from 'react-router-dom'

const Router = () => {
  return (
    <Routes>
      <Route path='/register' element={<Register />} />
    </Routes>
  )
}

export default Router
