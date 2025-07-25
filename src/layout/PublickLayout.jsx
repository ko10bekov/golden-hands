import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function PublickLayout() {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('key')
    if (!token) return navigate('/login')
  })
  return (
    <div className='container mx-auto overflow-x-hidden flex flex-col min-h-screen '>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

