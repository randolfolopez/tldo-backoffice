import { createContext, useContext, useState, useEffect } from 'react'
import api from './api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(api.getUser())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (api.isAuthenticated()) {
      api.get('/api/auth/me')
        .then(u => { setUser(u); localStorage.setItem('tldo_user', JSON.stringify(u)) })
        .catch(() => { api.clearToken(); setUser(null) })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    const data = await api.login(email, password)
    setUser(data.user)
    return data
  }

  const logout = () => {
    setUser(null)
    api.logout()
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
