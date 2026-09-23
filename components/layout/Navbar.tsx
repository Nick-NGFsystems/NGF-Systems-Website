'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from '@/components/ui/ThemeToggle'
import Button from '@/components/ui/Button'
import { NAV, PORTAL_URL } from '@/lib/nav'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // A route change must close the menu, or tapping a link on a phone
  // navigates behind a panel that stays open over the new page.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled || menuOpen
          ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="mx-auto max-w-6xl px-6 sm:px-8 h-16 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-sora font-semibold text-lg tracking-tight text-slate-900 dark:text-white shrink-0"
        >
          NGF<span className="text-blue-600 dark:text-blue-400"> Systems</span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {NAV.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive(href) ? 'page' : undefined}
                className={`px-3 py-2 rounded-lg font-body text-sm font-medium transition-colors ${
                  isActive(href)
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <Link
            href={PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-lg font-body text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Client login
          </Link>
          <ThemeToggle />
          <Button href="/contact" size="sm">
            Get a free mockup
          </Button>
        </div>

        <div className="md:hidden flex items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <span
              className={`block h-0.5 w-5 bg-slate-700 dark:bg-slate-300 transition-transform duration-200 ${
                menuOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-slate-700 dark:bg-slate-300 transition-opacity duration-200 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-slate-700 dark:bg-slate-300 transition-transform duration-200 ${
                menuOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-6 py-3"
        >
          <ul className="flex flex-col">
            {NAV.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? 'page' : undefined}
                  className={`flex min-h-[48px] items-center font-body text-base font-medium ${
                    isActive(href)
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="mt-1 border-t border-slate-200 dark:border-slate-800 pt-1">
              <Link
                href={PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[48px] items-center font-body text-base font-medium text-slate-700 dark:text-slate-300"
              >
                Client login
              </Link>
            </li>
          </ul>
          <Button href="/contact" size="md" className="mt-3 w-full">
            Get a free mockup
          </Button>
        </div>
      )}
    </header>
  )
}
