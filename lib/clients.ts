/**
 * The work. Six live client sites, each on its own custom domain.
 *
 * Every entry here was verified live on 2026-09-23 — the domain resolves,
 * serves 200, and the description is drawn from the site's own meta
 * description rather than written from memory. Nothing in this file is a
 * mockup, a staging URL or a `.vercel.app` preview: a portfolio that lists
 * unlaunched work is the fastest way to lose a prospect who clicks through.
 *
 * Adding a client: confirm the domain is live and that the client is content
 * to be named, then add the row. `modules` must reflect what is actually
 * switched on in their account — the Work page states these as fact.
 */

export interface ClientWork {
  /** The business name, as the business writes it. */
  name: string
  /** Domain without protocol, as it should read on the page. */
  domain: string
  /** Canonical URL to link to, protocol and host exactly as served. */
  url: string
  /** The industry, in plain words. */
  industry: string
  /** Where they trade. */
  location: string
  /** One sentence on the business, from their own site. */
  summary: string
  /** What the build had to solve. This is the interesting part, not the tech. */
  brief: string
  /** Capabilities live on this site — must match their client_configs. */
  modules: string[]
  /** Screenshot in /public/work, or null until one is captured. */
  image: string | null
}

export const CLIENTS: readonly ClientWork[] = [
  {
    name: 'West Michigan Window Tint',
    domain: 'westmiwindowtint.com',
    url: 'https://www.westmiwindowtint.com',
    industry: 'Automotive services',
    location: 'Grand Rapids, MI',
    summary:
      'Auto window tint, vinyl wrap, ambient lighting and residential window film.',
    brief:
      'A shop whose work is entirely visual and whose diary was run by phone. The site leads with galleries of real installs per service, and lets customers see availability instead of calling during a job.',
    modules: ['Website editor', 'Leads', 'Photo galleries'],
    image: null,
  },
  {
    name: 'Square K Vacations',
    domain: 'squarekvacations.com',
    url: 'https://squarekvacations.com',
    industry: 'Vacation rentals',
    location: 'Fennville & Bellaire, MI',
    summary:
      'Owner-operated luxury vacation rentals on the West Michigan lakeshore and Up North.',
    brief:
      'Three properties that each needed to sell themselves properly — full photo sets, layouts and local detail — without the owner paying a marketplace a cut of every booking.',
    modules: ['Website editor', 'Leads', 'Per-property pages'],
    image: null,
  },
  {
    name: 'North Cove Builders',
    domain: 'northcovebuilders.com',
    url: 'https://www.northcovebuilders.com',
    industry: 'Custom home building',
    location: 'West Michigan',
    summary:
      'Custom homes built across West Michigan with transparent pricing and a clear process.',
    brief:
      'A builder competing on trust rather than price. The site is built around the process and the finished work, with a detailed enquiry form that arrives qualified instead of as a bare name and number.',
    modules: ['Website editor', 'Leads', 'Project showcase'],
    image: null,
  },
  {
    name: 'CompassionIT',
    domain: 'compassionitconsulting.com',
    url: 'https://www.compassionitconsulting.com',
    industry: 'IT services',
    location: 'Grand Rapids & Allendale, MI',
    summary:
      'IT support, cybersecurity and business continuity for small and mid-sized businesses.',
    brief:
      'A consultancy selling expertise to other businesses. Everything is aimed at local search and at making a first conversation easy to start — no store, no booking, just credibility and contact.',
    modules: ['Website editor', 'Leads'],
    image: null,
  },
  {
    name: 'NOMA',
    domain: 'noelleandmary.com',
    url: 'https://www.noelleandmary.com',
    industry: 'Retail — jewellery',
    location: 'Michigan',
    summary: 'Everyday waterproof fine jewellery, designed to last.',
    brief:
      'A product brand that needed to sell directly rather than through a marketplace. Photography carries the site, and orders arrive in the portal with shipping and tax already handled.',
    modules: ['Website editor', 'Online store', 'Orders'],
    image: null,
  },
  {
    name: 'Aurum Drones',
    domain: 'aurumdrones.co.nz',
    url: 'https://www.aurumdrones.co.nz',
    industry: 'Aerial services',
    location: 'New Zealand',
    summary: 'Commercial drone photography and survey work.',
    brief:
      'Proof that the platform is not tied to Michigan. Same build, same portal, a client fourteen time zones away editing their own site.',
    modules: ['Website editor', 'Leads'],
    image: null,
  },
]

/** The home page shows a subset; Work shows all of them. */
export const FEATURED_CLIENTS = CLIENTS.slice(0, 3)

/** Distinct industries served — used as a proof point, computed not claimed. */
export const INDUSTRY_COUNT = new Set(CLIENTS.map((c) => c.industry)).size
