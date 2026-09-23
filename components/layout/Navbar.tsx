'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Button from '@/components/ui/Button'
import { NAV, PORTAL_URL, CONTACT } from '@/lib/nav'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  // A route change must close the menu, or tapping a link on a phone
  // navigates behind a panel that stays open over the new page.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-ink/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-4 px-6 sm:px-8">
        <Link href="/" className="shrink-0 text-[17px] font-semibold tracking-tight text-white">
          NGF<span className="text-sand"> Systems</span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive(href) ? 'page' : undefined}
                className={`text-[15px] transition-colors ${
                  isActive(href) ? 'text-white' : 'text-muted hover:text-white'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-5 md:flex">
          {/* A business that publishes its number reads differently from one
              that only offers a form. */}
          <a
            href={CONTACT.phoneHref}
            className="hidden text-[15px] text-muted transition-colors hover:text-white lg:block"
          >
            {CONTACT.phone}
          </a>
          <Link
            href={PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] text-muted transition-colors hover:text-white"
          >
            Client login
          </Link>
          <Button href="/contact" size="sm">
            Get a free mockup
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-lg transition-colors hover:bg-panel md:hidden"
        >
          <span
            className={`block h-0.5 w-5 bg-white transition-transform duration-200 ${
              menuOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-white transition-opacity duration-200 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-white transition-transform duration-200 ${
              menuOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-line bg-ink px-6 py-3 md:hidden">
          <ul className="flex flex-col">
            {NAV.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? 'page' : undefined}
                  className={`flex min-h-[48px] items-center text-[16px] font-medium ${
                    isActive(href) ? 'text-sand' : 'text-white/85'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="mt-1 border-t border-line pt-1">
              <a
                href={CONTACT.phoneHref}
                className="flex min-h-[48px] items-center text-[16px] font-medium text-muted"
              >
                {CONTACT.phone}
              </a>
            </li>
            <li>
              <Link
                href={PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[48px] items-center text-[16px] font-medium text-muted"
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
