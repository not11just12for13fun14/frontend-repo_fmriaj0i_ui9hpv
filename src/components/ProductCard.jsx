import React from 'react'

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="group bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all">
      <div className="aspect-square rounded-xl overflow-hidden bg-slate-800">
        <img src={product.image_url || 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1200&auto=format&fit=crop'} alt={product.title} className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform" />
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold truncate">{product.title}</h3>
          <span className="text-blue-300 font-bold">{product.price.toFixed(2)}€</span>
        </div>
        <p className="text-blue-200/70 text-sm mt-1 line-clamp-2">{product.description}</p>
        <div className="mt-2 flex items-center justify-between text-xs text-blue-200/70">
          <span>{product.species === 'dog' ? 'Chien' : 'Chat'}</span>
          <span>Tailles: {product.sizes?.join(', ')}</span>
        </div>
        <button onClick={() => onAdd(product)} className="mt-3 w-full rounded-lg bg-blue-600 hover:bg-blue-500 text-white py-2 font-semibold">
          Ajouter au panier
        </button>
      </div>
    </div>
  )
}
