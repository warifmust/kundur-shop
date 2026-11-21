import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth, DEMO_USER } from '../context/AuthContext.jsx'
import { useToast } from '../components/Toast.jsx'

export default function Login() {
  const { login } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPw, setShowPw] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    const res = login(email, password)
    if (!res.ok) {
      setError(res.error)
      return
    }
    toast('Signed in — welcome back')
    navigate(from, { replace: true })
  }

  return (
    <div className="wrap">
      <div className="login-shell">
        <div className="login-card">
          <div className="login-head">
            <span className="dot lg">K</span>
            <h1>Sign in to Kundur Supply</h1>
            <p>This is a demo store — use the credentials shown below.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="loginEmail">Email</label>
              <input
                id="loginEmail"
                type="email"
                autoComplete="username"
                placeholder="you@example.com"
                value={email}
                onChange={e => { setEmail(e.target.value); if (error) setError('') }}
                className={error ? 'invalid' : ''}
              />
            </div>

            <div className="field" style={{ marginTop: 14 }}>
              <label htmlFor="loginPassword">Password</label>
              <div className="pw-wrap">
                <input
                  id="loginPassword"
                  type={showPw ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => { setPassword(e.target.value); if (error) setError('') }}
                  className={error ? 'invalid' : ''}
                />
                <button
                  type="button"
                  className="pw-toggle"
                  onClick={() => setShowPw(v => !v)}
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {error && <p className="login-error">{error}</p>}

            <button className="btn primary block" type="submit" style={{ marginTop: 18 }}>
              Sign in
            </button>
          </form>

          <div className="demo-box">
            <div className="demo-title">Demo credentials</div>
            <div className="demo-row">
              <span className="demo-k">Username</span>
              <code className="demo-v">{DEMO_USER.email}</code>
            </div>
            <div className="demo-row">
              <span className="demo-k">Password</span>
              <code className="demo-v">{DEMO_USER.password}</code>
            </div>
          </div>

          <p className="login-foot">
            <Link to="/">← Back to the shop</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
