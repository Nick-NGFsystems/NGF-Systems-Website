/**
 * NGF's public price list, in one place.
 *
 * ── How the pricing is shaped ───────────────────────────────────────────────
 *
 * The axis is WHAT THE SITE DOES, never page count. A three-page site that
 * takes bookings is more build and more support than a nine-page brochure.
 * So there are three plans, one per shape of business that actually enquires
 * (just the website, website + booking, website + store), and each plan is
 * the base plus the platform modules it switches on. Every priced module
 * names the `client_configs` column that delivers it (see
 * NGF-Systems-app/lib/portal-capabilities.ts), so nothing can be sold that
 * the platform cannot actually do.
 *
 * Each plan can be paid two ways, the two contract shapes from HANDOFF.md:
 * Track A (monthly, NGF owns and licenses the site) and Track B (one-time,
 * the client owns the code). The page shows one track at a time.
 *
 * ── Source of truth ─────────────────────────────────────────────────────────
 *
 * 2026-11-18 — Nick set new prices (pricing strategy doc, "NGF Systems
 * pricing strategy"). Every figure below is his. Before this reaches
 * production, NGF-Systems-app/lib/pricing.ts and HANDOFF.md must carry the
 * same figures, because they prefill the Contract tab: if they disagree, the
 * website and the signed contract disagree. Figures the app must match:
 *   TRACKS.*.baseCents, TRACKS.monthly.setupCents, TRACKS.*.includedMinutes,
 *   MODULES.*.monthlyCents / oneTimeCents / setupCents / extraIncludedMinutes,
 *   every value in TERMS.
 *
 * Earlier history: a build with invented figures reached production on
 * 2026-09-23. Only figures Nick has set are ever rendered as prices. Anything
 * he has not set is `null`, must be listed in UNCONFIRMED_PRICING, and must
 * not be part of a plan (planFigures throws rather than invent a number).
 *
 * The website does not advertise a revision cap on the mockup (Nick,
 * 2026-11-12). The signed contract governs what is actually agreed.
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

/** `60` → `"1 hour"`, `150` → `"2.5 hours"`. */
export function hours(minutes: number): string {
  const h = minutes / 60
  return `${h.toLocaleString('en-US')} ${h === 1 ? 'hour' : 'hours'}`
}

// ── The two payment tracks ───────────────────────────────────────────────────

export type TrackKey = 'monthly' | 'oneTime'

export interface Track {
  key: TrackKey
  /** Plain, sentence-case name. The same words the contract uses. */
  name: string
  /** The words on the toggle that switches the page to this track. */
  toggleLabel: string
  /** One line: who this is for. */
  tagline: string
  /** The base price of the plain Website plan, and what it recurs on. */
  baseCents: number
  basePer: string
  /** True when the base is a starting point ("From $2,500"), not a fixed fee. */
  priceFrom: boolean
  /** The up-front number due before launch, if any. */
  setupCents: number | null
  setupNote: string | null
  /** Our time included every month for changes. Zero on a one-time build. */
  includedMinutes: number
  /** Who owns the code at the end of it. The real difference between tracks. */
  ownership: string
}

export const TRACKS: readonly Track[] = [
  {
    key: 'monthly',
    name: 'Monthly plan',
    toggleLabel: 'Pay monthly',
    tagline: 'We build it, host it and keep it running. You pay monthly and can stop any time.',
    baseCents: 14_900,
    basePer: '/month',
    priceFrom: false,
    setupCents: 75_000,
    setupNote: 'one-time setup, which covers the build and your first month',
    includedMinutes: 60,
    ownership: 'NGF owns the site and licenses it to you while your plan is active.',
  },
  {
    key: 'oneTime',
    name: 'One-time build',
    toggleLabel: 'Pay once and own it',
    tagline: 'Pay once and own the code outright. We hand over the repository.',
    baseCents: 250_000,
    basePer: 'one-time',
    priceFrom: true,
    setupCents: null,
    setupNote: null,
    includedMinutes: 0,
    ownership:
      'You own the code. We transfer the GitHub repository within 3 business days of your request.',
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
    title: 'Hosting, SSL and the domain',
    detail:
      'Your site runs on infrastructure we manage, with SSL and the domain pointed correctly. Something wrong? Tell us and we fix it — you are not the one working out why.',
  },
  {
    title: 'Every version saved',
    detail:
      'Every time you publish, the previous version is kept. If a change was a mistake, roll it back from your history in a couple of clicks.',
  },
  {
    title: 'Found on Google',
    detail:
      'Page titles, descriptions, a sitemap and genuinely fast load times done properly at build time, plus Google Analytics in your portal so you can see who is arriving.',
  },
  {
    title: 'A person who answers',
    detail:
      'Ask for a change from your portal and track it. You are talking to the person who built the site, not a ticket queue.',
  },
]

// ── Modules: priced by what the site does ────────────────────────────────────

/**
 * Each module is one capability in the client's portal. `configColumn` ties it
 * to NGF-Systems-app/lib/portal-capabilities.ts, so a module cannot be sold
 * without the switch that delivers it existing.
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
  /** Added to the monthly plan's setup fee. Null means quoted. */
  setupCents: number | null
  /** Added to a one-time build's price. Null means quoted. */
  oneTimeCents: number | null
  /** Extra time included each month on the monthly plan. */
  extraIncludedMinutes: number
  /** True when the module's setup and one-time figures are a starting point. */
  priceFrom: boolean
  /** True while Nick has not set this number. */
  unconfirmed: boolean
  /** Who this is actually for. */
  bestFor: string
}

export const MODULES: readonly Module[] = [
  {
    key: 'booking',
    name: 'Online booking',
    summary:
      'Customers book their own appointments from your site. You stop losing evenings to phone tag.',
    includes: [
      'Your services, prices and durations',
      'Weekly opening hours, time off, buffers and how far ahead people can book',
      'Confirmations by email or text, and a link the customer can use to cancel or reschedule themselves',
      'Optionally hold every booking for your approval before it is confirmed',
      'Every appointment in your portal, with cancel and reschedule',
    ],
    configColumn: 'feature_booking',
    monthlyCents: 10_000,
    setupCents: 50_000,
    oneTimeCents: 200_000,
    extraIncludedMinutes: 60,
    priceFrom: false,
    unconfirmed: false,
    bestFor: 'Barbers, detailers, tint shops, trades, consultants',
  },
  {
    key: 'store',
    name: 'Online store',
    summary: 'Sell products from your own site and keep the margin a marketplace would take.',
    includes: [
      'Product photos, descriptions and prices changed in the website editor, like the rest of your site',
      'Every order in your portal as it comes in, with payment and fulfilment tracked separately',
      'Your shipping rates, free-shipping threshold, sales tax rules and returns policy',
      'A confirmation email to the buyer and a notification to you on every paid order',
    ],
    configColumn: 'page_orders',
    monthlyCents: 25_000,
    // A starting point: setup and the one-time price grow with the size of the
    // catalogue being loaded. The monthly fee does not.
    setupCents: 125_000,
    oneTimeCents: 400_000,
    extraIncludedMinutes: 120,
    priceFrom: true,
    unconfirmed: false,
    bestFor: 'Retail, makers, jewellery, anyone shipping a physical product',
  },
  {
    key: 'custom',
    name: 'Custom development',
    summary:
      'Something your business needs that none of the above covers. Built for you, quoted per job before any work starts.',
    includes: [
      'Scoped and quoted from a conversation, never billed as a surprise',
      'Built on the same stack as your site, by the person who built your site',
      'Can run against a database of your own, which stays yours',
    ],
    // Deliberately not a capability: there is no switch for this in
    // client_configs, because it is bespoke work rather than a system that is
    // turned on. Quote-only by definition, with a published minimum in TERMS.
    configColumn: '—',
    monthlyCents: null,
    setupCents: null,
    oneTimeCents: null,
    extraIncludedMinutes: 0,
    priceFrom: true,
    unconfirmed: false,
    bestFor: 'Businesses with a workflow no off-the-shelf system fits',
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

/** The monthly plan's setup fee for the base + modules. Null when quote-only. */
export function setupQuote(moduleKeys: string[]): number | null {
  const base = track('monthly').setupCents
  if (base === null) return null
  let total = base
  for (const key of moduleKeys) {
    const add = moduleByKey(key).setupCents
    if (add === null) return null
    total += add
  }
  return total
}

// ── Plans ────────────────────────────────────────────────────────────────────

/**
 * Base-plus-modules is honest but asks the buyer to do arithmetic, which loses
 * people. These are the three shapes nearly every enquiry is, with the sum
 * already done. The page shows them side by side.
 */
export interface Plan {
  key: string
  name: string
  /** The kind of business, in one short line. */
  who: string
  moduleKeys: string[]
  /** Three short lines on what this plan does. Each true of the platform. */
  highlights: string[]
  /** Business days to answer a change request, on the monthly plan. */
  replyBusinessDays: number
  /** The enquiry the plan's button preselects. Must be in CONTACT_INTENTS. */
  intent: string
}

export const PLANS: readonly Plan[] = [
  {
    key: 'website',
    name: 'Website',
    who: 'For businesses that need to look credible and get the phone to ring',
    moduleKeys: [],
    highlights: [
      'A site designed for your business, fast on a phone',
      'Edit any text or photo yourself from your portal',
      'Every enquiry in one inbox and in your email',
    ],
    replyBusinessDays: 2,
    intent: 'Free mockup',
  },
  {
    key: 'booking',
    name: 'Website + booking',
    who: 'For businesses that run on appointments',
    moduleKeys: ['booking'],
    highlights: [
      'Everything in Website',
      'Customers book, cancel and reschedule themselves',
      'Confirmations by email or text, every booking in your portal',
    ],
    replyBusinessDays: 1,
    intent: 'Online booking',
  },
  {
    key: 'store',
    name: 'Website + store',
    who: 'For businesses that ship products',
    moduleKeys: ['store'],
    highlights: [
      'Everything in Website',
      'Sell from your own site and keep the margin',
      'Orders, shipping rates, sales tax and returns in your portal',
    ],
    replyBusinessDays: 1,
    intent: 'Online store',
  },
]

export interface PlanFigures {
  /** The headline price on this track. */
  priceCents: number
  /** Monthly track only: the up-front setup fee. */
  setupCents: number | null
  /** Monthly track only: our time included each month. */
  includedMinutes: number
  /** True when the headline price is a starting point. */
  priceFrom: boolean
  /** True when the setup (and so the first year) is a starting point. */
  setupFrom: boolean
  /**
   * What the first twelve months cost, all in. Monthly: setup plus eleven
   * monthly fees, since setup covers the first month. One-time: the build
   * plus twelve months of hosting.
   */
  firstYearCents: number
}

export function planFigures(trackKey: TrackKey, plan: Plan): PlanFigures {
  const t = track(trackKey)
  const modules = plan.moduleKeys.map(moduleByKey)
  const priceCents = quote(trackKey, plan.moduleKeys)
  if (priceCents === null) throw new Error(`Plan ${plan.key} has a quote-only module`)
  const anyFrom = modules.some((m) => m.priceFrom)

  if (trackKey === 'monthly') {
    const setupCents = setupQuote(plan.moduleKeys)
    if (setupCents === null) throw new Error(`Plan ${plan.key} has a quote-only setup`)
    return {
      priceCents,
      setupCents,
      includedMinutes:
        t.includedMinutes + modules.reduce((sum, m) => sum + m.extraIncludedMinutes, 0),
      // The monthly fee is fixed. Only a store's setup grows with its catalogue.
      priceFrom: t.priceFrom,
      setupFrom: anyFrom,
      firstYearCents: setupCents + priceCents * 11,
    }
  }

  return {
    priceCents,
    setupCents: null,
    includedMinutes: 0,
    priceFrom: t.priceFrom || anyFrom,
    setupFrom: t.priceFrom || anyFrom,
    firstYearCents: priceCents + TERMS.hostingCents * 12,
  }
}

// ── Standing terms ───────────────────────────────────────────────────────────

/** Every figure here must match the app's lib/pricing.ts before deploy. */
export const TERMS = {
  /** Hosting only, for a site the client owns. Included on the monthly plan. */
  hostingCents: 3_500,
  /** Hosting plus included time, for a site the client owns. */
  careCents: 9_900,
  careIncludedMinutes: 60,
  /** Work beyond included time, and all post-launch work on an owned site. */
  maintenanceRateCents: 9_500,
  maintenanceMinimumMinutes: 15,
  /** The smallest custom development job. */
  customMinimumCents: 150_000,
  /** Monthly plan prices are fixed for this long from launch. */
  priceLockMonths: 24,
  /** After this many months on a monthly plan the client may buy the site… */
  buyoutAfterMonths: 12,
  /** …for this many months of their plan fee. */
  buyoutMonthsOfFee: 6,
  /** Overdue invoices, per month. */
  lateFeePctPerMonth: 1.5,
  /** Silence after a mockup is sent counts as acceptance after this many days. */
  mockupAcceptanceDays: 14,
  /** Business days to transfer the GitHub repository on a one-time build. */
  repoTransferBusinessDays: 3,
  /** To restart a monthly site suspended for non-payment. */
  reactivationFeeCents: 20_000,
} as const

// ── Sign-off gate ────────────────────────────────────────────────────────────

/**
 * Every number on this site that Nick has not confirmed. Empty since
 * 2026-11-18, when he set the full price list. To leave a figure unpublished,
 * set it to `null`, add a line here, set `unconfirmed` on the module, and keep
 * that module out of PLANS.
 */
export const UNCONFIRMED_PRICING: readonly string[] = []

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
  'Custom development',
  'General enquiry',
]

export function isKnownIntent(value: string | null): value is string {
  return value !== null && CONTACT_INTENTS.includes(value)
}

/** The href that lands on the contact page with an intent preselected. */
export function contactHref(intent: string): string {
  return `/contact?intent=${encodeURIComponent(intent)}`
}
