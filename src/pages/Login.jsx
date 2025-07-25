import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router'

export default function Login() {
  const navigation = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('key')
    if (token) return navigation('/')
  }, [navigation])

  const handleSubmit = (e) => {
    e.preventDefault()
    const storedUserData = JSON.parse(localStorage.getItem('userData'))
    if (storedUserData && storedUserData.email === email && storedUserData.password === password) {
      localStorage.setItem('key', 1)
      navigation('/')
    } else {
      setErrorMessage('Неверный email или пароль')
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <div className="bg-gray-950 p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Вход</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Email</label>
            <input className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Пароль</label>
            <input className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500" 
            type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}
          <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded transition duration-300" type="submit"> Войти </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-400">
          Нет аккаунта?{' '}
          <Link to="/sign" className="text-sky-400 hover:text-sky-500 underline"> Зарегистрируйся </Link>
        </p>
        <button className="flex items-center justify-center py-2 mt-4 w-full border border-gray-700 rounded-lg hover:bg-gray-800">
          <img src="/src/assets/google 1 (1).png" alt="Google" className="w-6 h-6 mr-2" />
          <span className="text-sm text-gray-300">Войти через Google</span>
        </button>
      </div>
    </div>
  )
}
