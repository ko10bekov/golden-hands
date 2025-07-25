import React from 'react'
import { Route, Routes } from 'react-router'
import Login from './pages/Login'
import Sign from './pages/Sign'
import PublickLayout from './layout/PublickLayout'
import Main from './pages/Main'
import Personal from './pages/Personal'
import Zayavka from './pages/Zayavka'
import Service from './pages/Service'
import About from './pages/About'

export default function App() {
  return (
    <div className='bg-[#0F0C0C]'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/sign' element={<Sign />} />
        <Route path='/' element={<PublickLayout />}>
          <Route index element={<Main />} />
          <Route path='personal' element={<Personal />} />
          <Route path='zayavka' element={<Zayavka />} />
          <Route path='about' element={<About />} />
          <Route path='service' element={<Service />} />
        </Route>
      </Routes>
    </div>
  )
}
