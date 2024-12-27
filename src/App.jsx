import React from 'react'
import { Route , Routes  } from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'
import UserProtectwrapper from './pages/UserProtectwrapper'
import CaptainProtectwrapper from './pages/CaptainProtectWrapper'
import CaptainHome from './pages/CaptainHome'
import Riding from './pages/Riding'
import './App.css'
import 'remixicon/fonts/remixicon.css'
import CaptainRiding from './pages/CaptainRiding'


function App() {
  return (
   <div>
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/captain-login" element={<CaptainLogin/>} />
      <Route path="/captain-signup" element={<CaptainSignup />} />
      <Route path="/home" element={
        <UserProtectwrapper>
          <Home/>
          </UserProtectwrapper>} />

      <Route path='/captain-home' element={<CaptainProtectwrapper>
        <CaptainHome/>
      </CaptainProtectwrapper>} />

      <Route path='/riding' element={<Riding />} />
      <Route path='/captain-riding' element={<CaptainRiding />} />
    </Routes>

   </div>
  )
}

export default App