'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/75 backdrop-blur-xl border-b border-slate-200/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="font-sora font-bold text-xl tracking-tight">
          <span className="text-blue-600">NGF</span>
          <span className="text-slate-900">systems</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          <li>
            <Link href="#features" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
              Features
            </Link>
          </li>
          <li>
            <Link href="#contact" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
              Pricing
            </Link>
          </li>
          <li>
            <Link href="#contact" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
            >
              Get Started
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 min-h-[44px] min-w-[44px] items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-slate-700 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-slate-700 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-slate-700 transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 flex flex-col gap-4">
          <Link href="#features" className="text-sm font-medium text-slate-600 hover:text-blue-600 min-h-[44px] flex items-center" onClick={() => setMenuOpen(false)}>Features</Link>
          <Link href="#contact" className="text-sm font-medium text-slate-600 hover:text-blue-600 min-h-[44px] flex items-center" onClick={() => setMenuOpen(false)}>Pricing</Link>
          <Link href="#contact" className="text-sm font-medium text-slate-600 hover:text-blue-600 min-h-[44px] flex items-center" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link href="#contact" className="bg-blue-600 text-white text-sm font-medium px-5 py-3 rounded-lg text-center" onClick={() => setMenuOpen(false)}>Get Started</Link>
        </div>
      )}
    </nav>
  )
}
