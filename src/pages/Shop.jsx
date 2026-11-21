import { PRODUCTS, money } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'
import { useToast } from '../components/Toast.jsx'

function ProductCard({ product }) {
  const { addToCart } = useCart()
  const toast = useToast()

  return (
    <article className="card">
      <div className="thumb" style={{ '--t1': product.t1, '--t2': product.t2 }}>
        {product.emoji}
      </div>
      <div className="card-body">
        <h3>{product.name}</h3>
        <p className="blurb">{product.blurb}</p>
        <div className="card-foot">
          <span className="price">{money(product.price)}</span>
          <button
            className="btn primary"
            onClick={() => {
              addToCart(product.id, 1)
              toast(`${product.name} added to cart`)
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  )
}

export default function Shop() {
  return (
    <>
      <section className="hero wrap">
        <p className="eyebrow">Everyday goods, honestly made</p>
        <h1>Ten things worth owning.</h1>
        <p className="lede">
          A small, curated catalogue — audio, desk, home and outdoors. Free shipping over $100.
          This is a demo storefront; no real payments are processed.
        </p>
      </section>

      <main className="wrap">
        <div className="grid">
          {PRODUCTS.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </main>
    </>
  )
}
