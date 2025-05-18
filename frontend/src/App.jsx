import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Homepage'
import Loginpage from './pages/Loginpage'
import UserRegistration from './pages/UserRegistration'
import AdminLoginpage from './pages/AdminLoginpage'
import UserLogoutpage from './pages/UserLogoutpage'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Loginpage/>}/>
        <Route path='/user-registration' element={<UserRegistration/>}/>
        <Route path='/admin-login' element={<AdminLoginpage/>}/>
        <Route path='/viewer/logout' element={<UserLogoutpage/>}/>
      </Routes>
    </div>
  )
}

export default App
