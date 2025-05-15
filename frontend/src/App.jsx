import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Homepage'
import Loginpage from './pages/loginpage'
import UserRegistration from './pages/UserRegistration'
import AdminLoginpage from './pages/AdminLoginpage'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Loginpage/>}/>
        <Route path='/user-registration' element={<UserRegistration/>}/>
        <Route path='/admin-login' element={<AdminLoginpage/>}/>
      </Routes>
    </div>
  )
}

export default App
