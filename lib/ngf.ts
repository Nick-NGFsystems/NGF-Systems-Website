/**
 * Server-side fetch of this site's published content from the NGF portal.
 *
 * Content is keyed by `section.field` and edited by the portal's website
 * editor. Every consumer must fall back with `||`, never `??`: published
 * content can contain `''` when a field has been cleared, and `??` would
 * render the empty string instead of the hardcoded default.
 */

const NGF_API = 'https://app.ngfsystems.com'

// If NGF_CLIENT_ID is set, use it directly (legacy / manual override).
// Otherwise look the site up by its own domain — no env var needed.
const NGF_CLIENT_ID = process.env.NGF_CLIENT_ID

// Precedence is deliberately unchanged from before this file was reformatted:
// Vercel's production URL first, then the explicit env var. Flipping it would
// silently change which client record this site resolves to.
function getSiteDomain(): string {
  return (
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    'ngfsystems.com'
  )
}

export interface NgfSiteContent {
  hero?: { eyebrow?: string; headline?: string; subheadline?: string; ctaText?: string; ctaLink?: string }
  services?: { title?: string; subtitle?: string }
  work?: { title?: string; subtitle?: string }
  process?: { title?: string; subtitle?: string }
  pricing?: { title?: string; subtitle?: string }
  cta?: { headline?: string; subheadline?: string }
  clientbanner?: { headline?: string; subheadline?: string }
  footer?: { location?: string; blurb?: string }
  [key: string]: Record<string, string> | undefined
}

export async function getNgfContent(): Promise<NgfSiteContent> {
  try {
    let url: string

    if (NGF_CLIENT_ID) {
      url = `${NGF_API}/api/public/website/${NGF_CLIENT_ID}`
    } else {
      const domain = getSiteDomain()
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/$/, '')
      url = `${NGF_API}/api/public/website/by-domain/${encodeURIComponent(domain)}`
    }

    // Time-based ISR plus an instant cache bust on publish via /api/revalidate.
    // NEVER cache: 'no-store' — that hits the database on every pageview.
    const res = await fetch(url, { next: { revalidate: 60, tags: ['ngf-content'] } })
    if (!res.ok) return {}

    const data = (await res.json()) as { content?: NgfSiteContent }
    return data.content ?? {}
  } catch {
    return {}
  }
}
