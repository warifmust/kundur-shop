import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { money, COUNTRIES } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'
import { useToast } from '../components/Toast.jsx'

const RULES = {
  email:     v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || 'Enter a valid email address.',
  firstName: v => v.length >= 2 || 'Required.',
  lastName:  v => v.length >= 2 || 'Required.',
  address:   v => v.length >= 5 || 'Enter your street address.',
  city:      v => v.length >= 2 || 'Required.',
  zip:       v => /^[0-9A-Za-z\- ]{3,10}$/.test(v) || 'Enter a valid postcode.',
  country:   v => COUNTRIES.includes(v) || 'Choose a country from the list.',
  card:      v => /^[0-9 ]{15,19}$/.test(v) || 'Enter 15–16 digits.',
  expiry:    v => /^(0[1-9]|1[0-2])\/\d{2}$/.test(v) || 'Use MM/YY.',
  cvc:       v => /^\d{3,4}$/.test(v) || '3 or 4 digits.'
}

const FIELDS = [
  { name: 'email',     label: 'Email',            placeholder: 'you@example.com', full: true,  type: 'email' },
  { name: 'firstName', label: 'First name',       placeholder: 'Aisha' },
  { name: 'lastName',  label: 'Last name',        placeholder: 'Rahman' },
  { name: 'address',   label: 'Street address',   placeholder: '12 Jalan Ampang', full: true },
  { name: 'city',      label: 'City',             placeholder: 'Kuala Lumpur' },
  { name: 'zip',       label: 'Postcode',         placeholder: '50450' },
  { name: 'country',   label: 'Country',          placeholder: 'Start typing…', full: true, list: 'countryList' },
  { name: 'card',      label: 'Card number',      placeholder: '[CREDIT_CARD]', full: true, inputMode: 'numeric' },
  { name: 'expiry',    label: 'Expiry (MM/YY)',   placeholder: '12/29' },
  { name: 'cvc',       label: 'CVC',              placeholder: '123', inputMode: 'numeric' }
]

const EMPTY = Object.fromEntries(FIELDS.map(f => [f.name, '']))

export default function Checkout() {
  const { lines, totals, clearCart } = useCart()
  const toast = useToast()
  const navigate = useNavigate()

  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})

  if (!lines.length) {
    return (
      <>
        <section className="page-head wrap">
          <h1>Checkout</h1>
          <p>Demo checkout — no card is charged and nothing is sent anywhere.</p>
        </section>
        <div className="wrap" style={{ paddingBottom: 64 }}>
          <div className="empty">
            <div className="big">🧾</div>
            <h3>Nothing to check out</h3>
            <p>Your cart is empty — add something first.</p>
            <Link className="btn primary" to="/">Browse the shop</Link>
          </div>
        </div>
      </>
    )
  }

  function validateField(name, value) {
    const res = RULES[name](String(value).trim())
    setErrors(prev => {
      const next = { ...prev }
      if (res === true) delete next[name]
      else next[name] = res
      return next
    })
    return res === true
  }

  function handleChange(name, value) {
    setValues(prev => ({ ...prev, [name]: value }))
    if (errors[name]) validateField(name, value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const found = {}
    let firstBad = null
    FIELDS.forEach(f => {
      const res = RULES[f.name](String(values[f.name]).trim())
      if (res !== true) {
        found[f.name] = res
        if (!firstBad) firstBad = f.name
      }
    })
    setErrors(found)

    if (firstBad) {
      toast('Please fix the highlighted fields')
      const el = document.getElementById(firstBad)
      if (el) { el.focus(); el.scrollIntoView({ behavior: 'smooth', block: 'center' }) }
      return
    }

    const order = {
      id: 'KS-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
      placedAt: new Date().toISOString(),
      email: values.email.trim(),
      name: `${values.firstName.trim()} ${values.lastName.trim()}`,
      shipTo: [
        values.address.trim(),
        `${values.city.trim()} ${values.zip.trim()}`,
        values.country
      ],
      lines: lines.map(l => ({ name: l.name, qty: l.qty, line: l.line })),
      totals
    }
    localStorage.setItem('kundur_last_order', JSON.stringify(order))
    clearCart()
    navigate('/success')
  }

  return (
    <>
      <section className="page-head wrap">
        <h1>Checkout</h1>
        <p>Demo checkout — no card is charged and nothing is sent anywhere.</p>
      </section>

      <div className="wrap checkout-layout">
        <form onSubmit={handleSubmit} noValidate>
          <div className="panel">
            <h2>Contact &amp; shipping</h2>
            <p className="hint">All fields required. Card details are demo only — nothing is transmitted.</p>
            <div className="field-grid">
              {FIELDS.map(f => (
                <div className={`field${f.full ? ' full' : ''}`} key={f.name}>
                  <label htmlFor={f.name}>{f.label}</label>
                  <input
                    id={f.name}
                    name={f.name}
                    type={f.type || 'text'}
                    inputMode={f.inputMode}
                    list={f.list}
                    placeholder={f.placeholder}
                    value={values[f.name]}
                    className={errors[f.name] ? 'invalid' : ''}
                    onChange={e => handleChange(f.name, e.target.value)}
                    onBlur={() => validateField(f.name, values[f.name])}
                  />
                  <span className="err">{errors[f.name] || ''}</span>
                </div>
              ))}
              <datalist id="countryList">
                {COUNTRIES.map(c => <option key={c} value={c} />)}
              </datalist>
            </div>
          </div>
        </form>

        <aside>
          <div className="summary">
            <h2>Order summary</h2>
            {lines.map(l => (
              <div className="mini-line" key={l.id}>
                <span>{l.name} <span className="q">× {l.qty}</span></span>
                <span>{money(l.line)}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--line)', margin: '10px 0 4px' }} />
            <div className="row"><span>Subtotal</span><span><strong>{money(totals.subtotal)}</strong></span></div>
            <div className="row"><span>Shipping</span><span><strong>{totals.shipping ? money(totals.shipping) : 'Free'}</strong></span></div>
            <div className="row"><span>Tax (8%)</span><span><strong>{money(totals.tax)}</strong></span></div>
            <div className="row total"><span>Total</span><span>{money(totals.total)}</span></div>
            <button className="btn primary block" id="placeOrder" onClick={handleSubmit} style={{ marginTop: 16 }}>
              Place order
            </button>
            <Link className="btn ghost block" to="/cart" style={{ marginTop: 8 }}>Back to cart</Link>
          </div>
        </aside>
      </div>
    </>
  )
}
