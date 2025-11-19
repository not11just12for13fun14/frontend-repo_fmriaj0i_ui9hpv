import { useRef, useState } from 'react'
import Header from './components/Header'
import Shop from './components/Shop'
import Checkout from './components/Checkout'

function App() {
  const shopRef = useRef(null)
  const [checkout, setCheckout] = useState({ open: false, items: [], total: 0 })

  const scrollToShop = () => {
    document.getElementById('boutique')?.scrollIntoView({ behavior: 'smooth' })
  }

  const openCheckout = (items, total) => setCheckout({ open: true, items, total })
  const closeCheckout = () => setCheckout({ open: false, items: [], total: 0 })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.06),transparent_50%)]" />
      <div className="relative">
        <Header onShopClick={scrollToShop} />
        <div id="infos" className="mx-auto max-w-7xl px-6 py-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-blue-100">
            <h3 className="text-white font-bold text-lg">Confort supérieur</h3>
            <p className="mt-2 text-sm">Matériaux respirants, bords rembourrés et ajustements 4 points pour un maintien parfait.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-blue-100">
            <h3 className="text-white font-bold text-lg">Sécurité renforcée</h3>
            <p className="mt-2 text-sm">Boucles robustes, anneau en métal et bandes réfléchissantes pour vos sorties nocturnes.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-blue-100">
            <h3 className="text-white font-bold text-lg">Design stylé</h3>
            <p className="mt-2 text-sm">Couleurs modernes et coupes ergonomiques, pour un look au top sans compromettre le confort.</p>
          </div>
        </div>

        <Shop ref={shopRef} onCheckout={openCheckout} />
      </div>

      {checkout.open && (
        <Checkout items={checkout.items} total={checkout.total} onClose={closeCheckout} />
      )}
    </div>
  )
}

export default App
