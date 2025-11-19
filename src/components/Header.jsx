import React from 'react'

export default function Header({ onShopClick }) {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(147,197,253,0.2),transparent_40%)] pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 pt-14 pb-10 sm:pt-20 sm:pb-16">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            Harnais confort pour chiens & chats
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
            Sécurité, style et confort pour vos compagnons. Des tailles du XS au XL, conçues pour les promenades sereines.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <button onClick={onShopClick} className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-3 text-white font-semibold shadow hover:bg-blue-500 transition-colors">
              Découvrir la boutique
            </button>
            <a href="#infos" className="inline-flex items-center rounded-lg border border-white/20 px-5 py-3 text-white/90 hover:bg-white/10 transition-colors">
              En savoir plus
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
