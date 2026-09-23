/**
 * NGF's public price list, in one place.
 *
 * ── Why this file replaced the old tiers ────────────────────────────────────
 *
 * The previous pricing sold three tiers on PAGE COUNT ("3 pages", "4–7 pages",
 * "8–10 pages"). That never matched how the work is actually done: a 3-page
 * site with online booking is far more build and far more support than a
 * 9-page brochure. It also forced a bad conversation — "that's your eighth
 * page, you're on Premium now" — and it made a barber who needs bookings pay
 * for a storefront he will never switch on.
 *
 * So the axis here is WHAT THE SITE DOES, not how big it is. Every priced
 * module below is a real capability in the NGF platform, and each names the
 * `client_configs` column that switches it on (see
 * NGF-Systems-app/lib/portal-capabilities.ts). That means a quote is built
 * the same way the client's account is: tick the capabilities they need.
 * Nothing here can be sold that the platform cannot actually deliver.
 *
 * ── Two payment tracks, unchanged ───────────────────────────────────────────
 *
 * Track A (monthly) and Track B (one-time) are the real, existing contract
 * shapes from HANDOFF.md. They are orthogonal to the modules: a client picks
 * a track AND the capabilities they need.
 *
 * ── Source of truth, and what still needs sign-off ──────────────────────────
 *
 * CANONICAL — these figures match NGF-Systems-app/lib/pricing.ts, which is
 * generated from HANDOFF.md and prefills the Contract tab. Do not change one
 * without the other, or the website and the signed contract disagree:
 *   monthly.baseMonthlyCents, oneTime.baseBuildCents, oneTime.hostingCents,
 *   maintenanceRateCents, lateFeePctPerMonth, termDiscounts,
 *   freeMockupRevisionRounds, mockupAcceptanceDays
 *
 * PROPOSED — flagged `unconfirmed: true`. The app has no figure for these, and
 * the old website's numbers ($150/$300/$600 setup, $799/$1,500/$2,500 builds,
 * $30/mo hosting) were never reconciled with HANDOFF. They are a starting
 * point for Nick to set, not established prices. `UNCONFIRMED_PRICING` lists
 * them so a check can fail the build before any of them go live by accident.
 *
 * Money in CENTS. Pure: no React, no env, no network — importable anywhere.
 */

// ── Formatting ───────────────────────────────────────────────────────────────

/** `12500` → `"$125"`, `12550` → `"$125.50"`. Whole dollars lose the `.00`. */
export function usd(cents: number): string {
  const dollars = cents / 100
  return dollars % 1 === 0
    ? `$${dollars.toLocaleString('en-US')}`
    : `$${dollars.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

// ── The two payment tracks ───────────────────────────────────────────────────

export type TrackKey = 'monthly' | 'oneTime'

export interface Track {
  key: TrackKey
  /** Plain, sentence-case name. The same words the contract uses. */
  name: string
  /** One line: who this is for. */
  tagline: string
  /** The headline number and what it recurs on. */
  baseCents: number
  basePer: string
  /** The up-front number due before launch, if any. */
  setupCents: number | null
  setupNote: string | null
  /** Who owns the code at the end of it. The real difference between tracks. */
  ownership: string
  /** How post-launch changes are handled on this track. */
  changes: string
  /** Three to five facts a buyer needs before choosing. */
  terms: string[]
}

export const TRACKS: readonly Track[] = [
  {
    key: 'monthly',
    name: 'Monthly plan',
    tagline: 'We build it, host it, and keep it running. You pay monthly and can stop any time.',
    baseCents: 10_000, // CANONICAL — HANDOFF "$100/mo"
    basePer: '/month',
    setupCents: 15_000, // PROPOSED
    setupNote: 'one-time setup, due at launch',
    ownership: 'NGF owns the site and licenses it to you while your plan is active.',
    changes: 'Ordinary content changes are included — submit them from your portal.',
    terms: [
      'Hosting, SSL and domain setup included',
      'No contract term — cancel any time',
      'Setup covers the build and your first month',
      'Reactivation after a lapse is $200',
    ],
  },
  {
    key: 'oneTime',
    name: 'One-time build',
    tagline: 'Pay once and own the code outright. We hand over the repository.',
    baseCents: 60_000, // CANONICAL — HANDOFF "$600"
    basePer: 'one-time',
    setupCents: null,
    setupNote: null,
    ownership: 'You own the code. We transfer the GitHub repository within 3 business days of your request.',
    changes: 'Changes after launch are billed at $80/hour, in 15-minute increments.',
    terms: [
      'Due in full within 14 days of mockup approval',
      'Hosting is $20/month and can be cancelled any time',
      'You keep the site whether or not you stay hosted with us',
      'Up to 3 rounds of mockup revisions included',
    ],
  },
]

export function track(key: TrackKey): Track {
  const found = TRACKS.find((t) => t.key === key)
  if (!found) throw new Error(`Unknown pricing track: ${key}`)
  return found
}

// ── What every site includes ─────────────────────────────────────────────────

export interface IncludedItem {
  title: string
  detail: string
}

/**
 * The base. Every NGF site gets all of this on either track — this is the
 * "what we have" answer, and every line is something the platform really does.
 */
export const ALWAYS_INCLUDED: readonly IncludedItem[] = [
  {
    title: 'A site designed for your business',
    detail:
      'Built from scratch to fit how you actually sell, not dropped into a template. Fast on a phone, readable on a laptop.',
  },
  {
    title: 'Edit it yourself, without calling us',
    detail:
      'Open your site in the portal, click any text or photo, change it, and publish. No code, no tickets, no waiting on us for a price change or a new photo.',
  },
  {
    title: 'Every enquiry in one inbox',
    detail:
      'Contact forms on your site land in your portal with a status on each one, and land in your email the moment they arrive.',
  },
  {
    title: 'Hosting, security and backups',
    detail:
      'SSL, daily backups, and the domain pointed correctly. If something breaks at 2am it is our problem, not yours.',
  },
  {
    title: 'Found on Google',
    detail:
      'Page titles, descriptions, structured data, a sitemap and fast load times done properly at build time, plus Google Analytics wired up so you can see who is arriving.',
  },
  {
    title: 'A person who answers',
    detail:
      'Ask for a change from your portal and track it. You are talking to the person who built the site, not a ticket queue.',
  },
]

// ── Modules: priced by what the site does ────────────────────────────────────

/**
 * Each module is one capability in the client's portal. `capabilityKey` and
 * `configColumn` tie it to NGF-Systems-app/lib/portal-capabilities.ts, so a
 * module cannot be sold without the switch that delivers it existing.
 */
export interface Module {
  key: string
  name: string
  /** What the business gets, in the owner's words — not the feature's name. */
  summary: string
  /** Concrete capabilities, each true of the platform today. */
  includes: string[]
  /** The `client_configs` column in the NGF app that switches this on. */
  configColumn: string
  /** Added to the monthly plan's recurring fee. Null means quoted. */
  monthlyCents: number | null
  /** Added to a one-time build's price. Null means quoted. */
  oneTimeCents: number | null
  /** True while Nick has not set this number. */
  unconfirmed: boolean
  /** Who this is actually for — used for the worked examples. */
  bestFor: string
}

export const MODULES: readonly Module[] = [
  {
    key: 'booking',
    name: 'Online booking',
    summary:
      'Customers book and pay for their own appointments. You stop losing evenings to phone tag.',
    includes: [
      'Your services, prices and durations',
      'Weekly opening hours and time off',
      'Automatic confirmation emails to the customer',
      'Every appointment in your portal, with the ability to cancel or reschedule',
    ],
    configColumn: 'feature_booking',
    monthlyCents: 5_000, // PROPOSED
    oneTimeCents: 40_000, // PROPOSED
    unconfirmed: true,
    bestFor: 'Barbers, detailers, tint shops, trades, consultants',
  },
  {
    key: 'store',
    name: 'Online store',
    summary: 'Sell products from your own site and keep the margin a marketplace would take.',
    includes: [
      'Products, photos and prices you control',
      'Orders in your portal as they come in',
      'Shipping, tax and store policy settings',
      'Order notifications by email',
    ],
    configColumn: 'page_orders',
    monthlyCents: 7_500, // PROPOSED
    oneTimeCents: 75_000, // PROPOSED
    unconfirmed: true,
    bestFor: 'Retail, makers, jewellery, anyone shipping a physical product',
  },
  {
    key: 'accounts',
    name: 'Customer accounts',
    summary:
      'Your own customers get a login — to file a request, track a job, or see their history.',
    includes: [
      'A secure login for each of your customers',
      'Requests and job status tracked against their account',
      'Runs against your own database, which stays yours',
    ],
    configColumn: 'database_url',
    monthlyCents: null,
    oneTimeCents: null,
    unconfirmed: true,
    bestFor: 'Service businesses with repeat customers and ongoing jobs',
  },
  {
    key: 'integrations',
    name: 'Custom integrations',
    summary:
      'Connect the site to the software you already run, so you are not typing the same thing twice.',
    includes: [
      'CRM, scheduling and accounting connections',
      'Payment processing beyond the standard checkout',
      'Data imports from whatever you are on today',
    ],
    configColumn: '—',
    monthlyCents: null,
    oneTimeCents: null,
    unconfirmed: true,
    bestFor: 'Established businesses with systems already in place',
  },
]

export function moduleByKey(key: string): Module {
  const found = MODULES.find((m) => m.key === key)
  if (!found) throw new Error(`Unknown pricing module: ${key}`)
  return found
}

/** Base + the named modules, on one track. Null when any part is quote-only. */
export function quote(trackKey: TrackKey, moduleKeys: string[]): number | null {
  const t = track(trackKey)
  let total = t.baseCents
  for (const key of moduleKeys) {
    const m = moduleByKey(key)
    const add = trackKey === 'monthly' ? m.monthlyCents : m.oneTimeCents
    if (add === null) return null
    total += add
  }
  return total
}

// ── Worked examples ──────────────────────────────────────────────────────────

/**
 * Base-plus-modules is honest but it asks the buyer to do arithmetic, which
 * loses people. These are the three shapes most enquiries actually are, drawn
 * from live client accounts, so the page can show the sum already done.
 */
export interface Example {
  label: string
  /** The kind of business, not a named client. */
  who: string
  moduleKeys: string[]
  /** Why this business needs exactly these modules. */
  rationale: string
}

export const EXAMPLES: readonly Example[] = [
  {
    label: 'Just the website',
    who: 'An IT consultancy that needs to look credible and be contacted',
    moduleKeys: [],
    rationale:
      'No bookings, no products. The site has to explain the service, rank locally, and get the phone to ring.',
  },
  {
    label: 'Website + booking',
    who: 'A window tint shop taking appointments all week',
    moduleKeys: ['booking'],
    rationale:
      'Every hour spent on the phone arranging a slot is an hour not spent installing. Customers book themselves.',
  },
  {
    label: 'Website + store',
    who: 'A jewellery brand shipping orders direct',
    moduleKeys: ['store'],
    rationale:
      'Selling from their own site instead of a marketplace, and keeping the customer relationship and the margin.',
  },
]

// ── Standing terms ───────────────────────────────────────────────────────────

/** CANONICAL — every figure here matches the app's lib/pricing.ts. */
export const TERMS = {
  /** Post-launch work on the one-time track, and beyond included changes on monthly. */
  maintenanceRateCents: 8_000,
  maintenanceMinimumMinutes: 15,
  /** Overdue invoices, per month. */
  lateFeePctPerMonth: 1.5,
  /** Rounds of mockup revisions before revisions bill at the maintenance rate. */
  freeMockupRevisionRounds: 3,
  /** Silence after a mockup is sent counts as acceptance after this many days. */
  mockupAcceptanceDays: 14,
  /** Business days to transfer the GitHub repository on a one-time build. */
  repoTransferBusinessDays: 3,
  /** To restart a monthly site suspended for non-payment. */
  reactivationFeeCents: 20_000,
  /** Optional, only when a client asks for a term commitment. */
  termDiscounts: [
    { months: 12, discountPct: 0 },
    { months: 24, discountPct: 10 },
    { months: 36, discountPct: 20 },
  ],
} as const

// ── Sign-off gate ────────────────────────────────────────────────────────────

/**
 * Every number on this site that Nick has not confirmed. `npm run doctor`
 * reads this, so an unconfirmed figure cannot quietly become a published
 * price. Setting a real number means deleting its entry here AND clearing
 * `unconfirmed` on the module.
 */
export const UNCONFIRMED_PRICING: readonly string[] = [
  'TRACKS.monthly.setupCents ($150 setup fee — the app has no figure for this)',
  'MODULES.booking.monthlyCents / oneTimeCents',
  'MODULES.store.monthlyCents / oneTimeCents',
  'MODULES.accounts — quote-only, no figure set',
  'MODULES.integrations — quote-only, no figure set',
]

export const HAS_UNCONFIRMED_PRICING = UNCONFIRMED_PRICING.length > 0

// ── Contact intents ──────────────────────────────────────────────────────────

/**
 * What a visitor can arrive at the contact form already asking for, via
 * `?intent=`. It is a fixed list on purpose: the old form reflected whatever
 * string the query string carried straight into the page, so any link could
 * be crafted to display arbitrary text above NGF's own form. Anything not on
 * this list is ignored and the form renders plain.
 */
export const CONTACT_INTENTS: readonly string[] = [
  'Free mockup',
  'Monthly plan',
  'One-time build',
  'Online booking',
  'Online store',
  'Customer accounts',
  'Custom integrations',
  'General enquiry',
]

export function isKnownIntent(value: string | null): value is string {
  return value !== null && CONTACT_INTENTS.includes(value)
}

/** The href that lands on the contact page with an intent preselected. */
export function contactHref(intent: string): string {
  return `/contact?intent=${encodeURIComponent(intent)}`
}
