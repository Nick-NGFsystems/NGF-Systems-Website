'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-2xl shadow-sm shadow-slate-200/50 border-b border-slate-200/50' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="font-sora font-bold text-xl tracking-tight flex items-center gap-1">
          <span className="text-blue-600">NGF</span>
          <span className="text-slate-900">systems</span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {[['#features', 'Features'], ['#pricing', 'Pricing'], ['#contact', 'Contact']].map(([href, label]) => (
            <li key={href}>
              <Link href={href} className="text-sm font-medium text-slate-500 hover:text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-100/80 transition-all">
                {label}
              </Link>
            </li>
          ))}
          <li className="ml-2">
            <Link href="#contact" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-px">
              Get Started
            </Link>
          </li>
        </ul>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2 min-h-[44px] min-w-[44px] items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-slate-700 transition-all duration-200 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-slate-700 transition-all duration-200 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-slate-700 transition-all duration-200 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 px-5 py-4 flex flex-col gap-1 shadow-xl">
          {[['#features', 'Features'], ['#pricing', 'Pricing'], ['#contact', 'Contact']].map(([href, label]) => (
            <Link key={href} href={href} className="text-sm font-medium text-slate-600 hover:text-blue-600 min-h-[44px] flex items-center px-2 rounded-lg hover:bg-slate-50 transition-colors" onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
          <Link href="#contact" className="bg-blue-600 text-white text-sm font-semibold px-5 py-3 rounded-xl text-center mt-2" onClick={() => setMenuOpen(false)}>
            Get Started
          </Link>
        </div>
      )}
    </nav>
  )
}
