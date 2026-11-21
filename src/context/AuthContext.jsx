import { createContext, useContext, useState, useCallback } from 'react'

const KEY = 'kundur_auth_v1'

/* Demo credentials — intentionally displayed on the login page. */
export const DEMO_USER = {
  email: 'kundur@email.com',
  password: 'kundur_shop'
}

const AuthContext = createContext(null)

function readStored() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStored)

  const login = useCallback((email, password) => {
    const ok =
      email.trim().toLowerCase() === DEMO_USER.email &&
      password === DEMO_USER.password

    if (!ok) return { ok: false, error: 'Incorrect email or password. Try the demo credentials below.' }

    const next = { email: DEMO_USER.email, name: 'Kundur', loggedInAt: new Date().toISOString() }
    localStorage.setItem(KEY, JSON.stringify(next))
    setUser(next)
    return { ok: true }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(KEY)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthed: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
