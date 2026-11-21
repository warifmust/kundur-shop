import { Link } from 'react-router-dom'
import { money, FREE_SHIPPING_AT } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'
import { useToast } from '../components/Toast.jsx'

export default function Cart() {
  const { lines, count, totals, setQty, removeItem } = useCart()
  const toast = useToast()

  if (!lines.length) {
    return (
      <>
        <section className="page-head wrap">
          <h1>Your cart</h1>
          <p>Nothing here yet.</p>
        </section>
        <div className="wrap" style={{ paddingBottom: 64 }}>
          <div className="empty">
            <div className="big">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Add a few things and they'll show up here.</p>
            <Link className="btn primary" to="/">Browse the shop</Link>
          </div>
        </div>
      </>
    )
  }

  const remaining = FREE_SHIPPING_AT - totals.subtotal

  return (
    <>
      <section className="page-head wrap">
        <h1>Your cart</h1>
        <p>{count} item{count === 1 ? '' : 's'} in your cart.</p>
      </section>

      <div className="wrap cart-layout">
        <div className="lines">
          {lines.map(l => (
            <div className="line" key={l.id}>
              <div className="thumb-sm" style={{ '--t1': l.t1, '--t2': l.t2 }}>{l.emoji}</div>
              <div>
                <h3>{l.name}</h3>
                <div className="meta">{l.category} · {money(l.price)} each</div>
                <div className="meta" style={{ marginTop: 8 }}>
                  <span className="qty">
                    <button aria-label={`Decrease ${l.name}`} onClick={() => setQty(l.id, l.qty - 1)}>−</button>
                    <span>{l.qty}</span>
                    <button aria-label={`Increase ${l.name}`} onClick={() => setQty(l.id, l.qty + 1)}>+</button>
                  </span>
                </div>
              </div>
              <div className="line-right">
                <span className="line-total">{money(l.line)}</span>
                <button
                  className="btn danger"
                  onClick={() => { removeItem(l.id); toast(`${l.name} removed`) }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <aside>
          <div className="summary">
            <h2>Order summary</h2>
            <div className="row"><span>Subtotal</span><span><strong>{money(totals.subtotal)}</strong></span></div>
            <div className="row"><span>Shipping</span><span><strong>{totals.shipping ? money(totals.shipping) : 'Free'}</strong></span></div>
            <div className="row"><span>Estimated tax (8%)</span><span><strong>{money(totals.tax)}</strong></span></div>
            <div className="row total"><span>Total</span><span>{money(totals.total)}</span></div>

            {remaining > 0
              ? <p className="ship-note">Add {money(remaining)} more for free shipping.</p>
              : <p className="ship-note">You've unlocked free shipping ✓</p>}

            <Link className="btn primary block" to="/checkout" style={{ marginTop: 16 }}>
              Proceed to checkout
            </Link>
            <Link className="btn ghost block" to="/" style={{ marginTop: 8 }}>Keep shopping</Link>
          </div>
        </aside>
      </div>
    </>
  )
}
