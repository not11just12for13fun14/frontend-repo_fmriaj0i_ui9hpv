import React, { useState } from 'react'

export default function Checkout({ items, total, onClose }) {
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [form, setForm] = useState({ name: '', email: '', address: '', city: '', country: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setDone(null)
    try {
      const res = await fetch(`${backend}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({ product_id: i.product_id, title: i.title, price: i.price, quantity: i.quantity, image_url: i.image_url })),
          customer: form,
          total,
        }),
      })
      if (!res.ok) throw new Error('Erreur de paiement')
      const data = await res.json()
      setDone({ id: data.id })
    } catch (e) {
      setDone({ error: e.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-white text-xl font-bold">Finaliser la commande</h3>
          <button onClick={onClose} className="text-white/70 hover:text-white">✕</button>
        </div>

        <p className="text-blue-200/80 mt-2 text-sm">Total: <span className="text-white font-semibold">{total.toFixed(2)}€</span></p>

        {done?.id ? (
          <div className="mt-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-4 text-emerald-200">
            Merci! Votre commande a été enregistrée. Référence: <span className="font-mono text-white">{done.id}</span>
          </div>
        ) : done?.error ? (
          <div className="mt-4 rounded-lg bg-red-500/10 border border-red-500/30 p-4 text-red-200">
            {done.error}
          </div>
        ) : null}

        <form onSubmit={submit} className="mt-4 grid grid-cols-1 gap-3">
          <input required placeholder="Nom complet" className="bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input required type="email" placeholder="Email" className="bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input required placeholder="Adresse" className="bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Ville" className="bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            <input placeholder="Pays" className="bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
          </div>
          <button disabled={loading} className="mt-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white py-2 font-semibold">
            {loading ? 'Traitement...' : 'Payer maintenant'}
          </button>
        </form>
      </div>
    </div>
  )
}
