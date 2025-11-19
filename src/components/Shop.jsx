import React, { useEffect, useMemo, useState } from 'react'
import ProductCard from './ProductCard'

export default function Shop({ onCheckout }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState({ species: 'all', size: 'all', query: '' })
  const [cart, setCart] = useState([])

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        if (filter.species !== 'all') params.set('species', filter.species)
        if (filter.size !== 'all') params.set('size', filter.size)
        const res = await fetch(`${backend}/api/products?${params.toString()}`)
        const data = await res.json()
        setProducts(data)
      } catch (e) {
        setError('Impossible de charger les produits.')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [filter.species, filter.size])

  const filtered = useMemo(() => {
    if (!filter.query) return products
    return products.filter((p) => p.title.toLowerCase().includes(filter.query.toLowerCase()))
  }, [products, filter.query])

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product_id === product._id || i.title === product.title)
      if (existing) {
        return prev.map((i) => (i.title === product.title ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, { product_id: product._id || product.id || product.title, title: product.title, price: product.price, quantity: 1, image_url: product.image_url }]
    })
  }

  const total = useMemo(() => cart.reduce((sum, i) => sum + i.price * i.quantity, 0), [cart])

  return (
    <section id="boutique" className="relative z-10 mx-auto max-w-7xl px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Boutique</h2>
          <p className="text-blue-200/80">Harnais premium pour chiens et chats</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <select className="bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2" value={filter.species} onChange={(e) => setFilter((f) => ({ ...f, species: e.target.value }))}>
            <option value="all">Tous</option>
            <option value="dog">Chien</option>
            <option value="cat">Chat</option>
          </select>
          <select className="bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2" value={filter.size} onChange={(e) => setFilter((f) => ({ ...f, size: e.target.value }))}>
            <option value="all">Toutes tailles</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
          <input className="bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 placeholder:text-white/50" placeholder="Rechercher" value={filter.query} onChange={(e) => setFilter((f) => ({ ...f, query: e.target.value }))} />
        </div>
      </div>

      {loading ? (
        <p className="text-blue-100 mt-6">Chargement des produits...</p>
      ) : error ? (
        <p className="text-red-300 mt-6">{error}</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <ProductCard key={p.title} product={p} onAdd={addToCart} />
          ))}
        </div>
      )}

      {/* Cart bar */}
      <div className="sticky bottom-4 mt-10">
        <div className="backdrop-blur bg-slate-900/60 border border-white/10 rounded-2xl px-4 py-3 flex items-center justify-between">
          <div className="text-blue-100 text-sm">
            Panier: {cart.reduce((sum, i) => sum + i.quantity, 0)} article(s) • <span className="font-semibold text-white">{total.toFixed(2)}€</span>
          </div>
          <button onClick={() => onCheckout(cart, total)} className="rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 font-semibold">
            Passer la commande
          </button>
        </div>
      </div>
    </section>
  )
}
