import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Header() {
  const { count } = useCart()
  const { isAuthed, user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="site">
      <div className="wrap nav">
        <Link className="brand" to="/">
          <span className="dot">K</span> Kundur Supply
        </Link>

        <nav className="nav-links">
          <NavLink to="/">Shop</NavLink>
          <NavLink to="/cart">Cart</NavLink>
          <NavLink to="/checkout">Checkout</NavLink>
        </nav>

        <div className="nav-right">
          {isAuthed && (
            <span className="who" title={user.email}>
              <span className="who-dot" /> {user.email}
            </span>
          )}
          {isAuthed ? (
            <button className="btn ghost sm" onClick={handleLogout}>Log out</button>
          ) : (
            <Link className="btn ghost sm" to="/login">Log in</Link>
          )}
          <Link className="cart-btn" to="/cart">
            Cart <span className="badge" style={{ display: count ? 'inline-flex' : 'none' }}>{count}</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
