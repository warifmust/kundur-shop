import { Link } from 'react-router-dom'
import { money } from '../data/products.js'

function readOrder() {
  try {
    const raw = localStorage.getItem('kundur_last_order')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export default function Success() {
  const order = readOrder()

  if (!order) {
    return (
      <div className="wrap">
        <div className="success">
          <div className="tick">✓</div>
          <h1>No recent order found</h1>
          <p>Place an order to see its confirmation here.</p>
          <Link className="btn primary" to="/" style={{ marginTop: 16 }}>Back to the shop</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="wrap">
      <div className="success">
        <div className="tick">✓</div>
        <h1>Thanks, {order.name.split(' ')[0]} — order placed.</h1>
        <p>Order number <span className="order-no">{order.id}</span></p>
        <p>A confirmation would normally go to {order.email}.</p>

        <div style={{ textAlign: 'left', margin: '26px 0 6px' }}>
          {order.lines.map((l, i) => (
            <div className="mini-line" key={i}>
              <span>{l.name} <span className="q">× {l.qty}</span></span>
              <span>{money(l.line)}</span>
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--line)', margin: '10px 0 4px' }} />
          <div className="row"><span>Subtotal</span><span><strong>{money(order.totals.subtotal)}</strong></span></div>
          <div className="row"><span>Shipping</span><span><strong>{order.totals.shipping ? money(order.totals.shipping) : 'Free'}</strong></span></div>
          <div className="row"><span>Tax</span><span><strong>{money(order.totals.tax)}</strong></span></div>
          <div className="row total"><span>Total paid</span><span>{money(order.totals.total)}</span></div>
        </div>

        <p style={{ marginTop: 18 }}>Shipping to:</p>
        <p style={{ color: 'var(--ink)', fontSize: 13 }}>
          {order.shipTo.map((line, i) => <span key={i}>{line}<br /></span>)}
        </p>

        <Link className="btn primary" to="/" style={{ marginTop: 22 }}>Continue shopping</Link>
      </div>
    </div>
  )
}
