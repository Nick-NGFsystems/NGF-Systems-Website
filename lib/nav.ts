/**
 * The one table of destinations. The navbar, the mobile menu, the footer and
 * the sitemap all read this, so they cannot disagree about what pages exist —
 * the old site had the same three anchors hard-coded in three components.
 */

export interface NavItem {
  href: string
  label: string
  /** One line, shown in the footer. */
  description: string
}

export const NAV: readonly NavItem[] = [
  { href: '/services', label: 'Services', description: 'What we build and what we manage' },
  { href: '/work', label: 'Work', description: 'Live sites we build and run today' },
  { href: '/pricing', label: 'Pricing', description: 'What it costs, priced by what it does' },
  { href: '/about', label: 'About', description: 'Who you are actually working with' },
  { href: '/contact', label: 'Contact', description: 'Start a conversation' },
]

/** Where existing clients sign in. Deliberately not a nav item — it is a different audience. */
export const PORTAL_URL = 'https://app.ngfsystems.com'

/** Routes for the sitemap, in priority order. `/` plus every nav destination. */
export const ROUTES = ['/', ...NAV.map((n) => n.href)] as const

export const CONTACT = {
  email: 'nick@ngfsystems.com',
  phone: '+1 (906) 448-9989',
  phoneHref: 'tel:+19064489989',
  location: 'Hudsonville, Michigan',
  serviceArea: 'West Michigan and remote',
} as const
