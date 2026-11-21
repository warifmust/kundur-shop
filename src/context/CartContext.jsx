import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { PRODUCTS, FREE_SHIPPING_AT, FLAT_SHIPPING, TAX_RATE } from '../data/products.js'

const KEY = 'kundur_cart_v1'
const CartContext = createContext(null)

function readStored() {
  try {
    const raw = localStorage.getItem(KEY)
    const parsed = raw ? JSON.parse(raw) : {}
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(readStored)

  const persist = useCallback((next) => {
    setCart(next)
    try { localStorage.setItem(KEY, JSON.stringify(next)) } catch { /* quota — ignore */ }
  }, [])

  const addToCart = useCallback((id, qty = 1) => {
    setCart(prev => {
      const next = { ...prev, [id]: (prev[id] || 0) + qty }
      try { localStorage.setItem(KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const setQty = useCallback((id, qty) => {
    setCart(prev => {
      const next = { ...prev }
      if (qty <= 0) delete next[id]
      else next[id] = qty
      try { localStorage.setItem(KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const removeItem = useCallback((id) => {
    setCart(prev => {
      const next = { ...prev }
      delete next[id]
      try { localStorage.setItem(KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const clearCart = useCallback(() => persist({}), [persist])

  const lines = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => {
          const p = PRODUCTS.find(x => x.id === id)
          return p ? { ...p, qty, line: p.price * qty } : null
        })
        .filter(Boolean),
    [cart]
  )

  const count = useMemo(() => lines.reduce((s, l) => s + l.qty, 0), [lines])

  const totals = useMemo(() => {
    const subtotal = lines.reduce((s, l) => s + l.line, 0)
    const shipping = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_AT ? 0 : FLAT_SHIPPING
    const tax = Math.round(subtotal * TAX_RATE)
    return { subtotal, shipping, tax, total: subtotal + shipping + tax }
  }, [lines])

  const value = { cart, lines, count, totals, addToCart, setQty, removeItem, clearCart }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
