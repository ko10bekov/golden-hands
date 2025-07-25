import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router'

export default function Header() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [userData, setUserData] = useState({})

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('applications')) || []
    if (data.length > 0) {
      setUserData(data[0])
    } else {
      const fallback = JSON.parse(localStorage.getItem('userData')) || {}
      setUserData(fallback)
    }
  }, [])

  const navData = [
    { id: 1, title: 'Дом', href: '/' },
    { id: 2, title: 'Работники', href: '/personal' },
    { id: 4, title: 'Сервис', href: '/service' },
    { id: 5, title: 'О нас', href: '/about' },
  ]

  return (
    <header className="px-6 py-6 text-[var(--text-color)] bg-[#111]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img className="w-[100px]" src="./src/assets/Golden.png" alt="Logo" />
          <h1 className="text-xl font-bold leading-tight text-white ml-2">
            <span className="block">Golden</span>
            <span className="block">Hands</span>
          </h1>
        </div>

        <nav className="hidden lg:flex">
          <ul className="flex items-center gap-[40px]">
            {navData.map(link => (
              <li key={link.id}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    `duration-300 hover:text-[#0166FE] ${
                      isActive ? 'text-[#0166FE] font-semibold' : 'text-white'
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:flex items-center">
          <button className="text-[#FD3B3B]" onClick={() => setContactOpen(true)}>Профиль</button>
          <div className="h-5 w-px bg-[#666666] mx-2" />
          <button
            className="px-7 py-2 bg-[#FD3B3B] rounded-full text-white"
            onClick={() => {
              localStorage.removeItem('key')
              window.location.reload()
            }}
          >
            Sign up
          </button>
        </div>

        <button
          className="lg:hidden flex flex-col justify-center items-center gap-[6px]"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-opacity ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <nav className="lg:hidden mt-4 bg-[#222] rounded-md p-4">
          <ul className="flex flex-col gap-4">
            {navData.map(link => (
              <li key={link.id}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    `block text-white hover:text-[#0166FE] ${
                      isActive ? 'text-[#0166FE] font-semibold' : ''
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-4">
            <button className="text-[#FD3B3B] text-left" onClick={() => setContactOpen(true)}>Профиль</button>
            <button
              className="px-6 py-2 bg-[#FD3B3B] rounded-full text-white w-full text-center"
              onClick={() => {
                localStorage.removeItem('key')
                window.location.reload()
              }}
            >
              Sign up
            </button>
          </div>
        </nav>
      )}

      {contactOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#1a1a1a] text-black dark:text-white p-6 rounded-md max-w-sm w-full relative">
            <button
              className="absolute top-2 right-2 text-xl text-gray-500 hover:text-[#FD3B3B]"
              onClick={() => setContactOpen(false)}
            >
              ×
            </button>
            <h3 className="text-lg font-semibold mb-4">Ваши данные</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Имя:</strong> {userData.name || 'Не указано'}</p>
              <p><strong>ФИО:</strong> {userData.fullName || 'Не указано'}</p>
              <p><strong>Email:</strong> {userData.email || 'Не указано'}</p>
              <p><strong>Работа:</strong> {userData.job || 'Не указано'}</p>
              <p><strong>Страна:</strong> {userData.country || 'Не указано'}</p>
              <p><strong>Город:</strong> {userData.city || 'Не указано'}</p>
            </div>
            <hr className="my-4" />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Нужна помощь? Свяжитесь с нами: <span className="text-[#FD3B3B] font-semibold">+996 700 123 456</span>
            </p>
          </div>
        </div>
      )}
    </header>
  )
}
