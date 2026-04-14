const NGF_CLIENT_ID = process.env.NGF_CLIENT_ID || 'cmnxxexlo00018q1up7l3jf3m'
const NGF_API = 'https://app.ngfsystems.com'

export interface NgfSiteContent {
  hero?: { subheadline?: string; ctaText?: string; ctaLink?: string }
  features?: { title?: string; subtitle?: string }
  pricing?: { title?: string; subtitle?: string }
  cta?: { headline?: string; subheadline?: string }
  clientbanner?: { headline?: string; subheadline?: string }
  footer?: { location?: string }
  [key: string]: Record<string, string> | undefined
}

export async function getNgfContent(): Promise<NgfSiteContent> {
  try {
    const res = await fetch(
      `${NGF_API}/api/public/website/${NGF_CLIENT_ID}`,
      { next: { tags: ['ngf-content'], revalidate: false } }
    )
    if (!res.ok) return {}
    const data = await res.json() as { content?: NgfSiteContent }
    const c = data.content ?? {}
    // Skip if still the auto-seeded placeholder defaults
    const heroSub = (c as { hero?: { subheadline?: string } }).hero?.subheadline
    if (heroSub === 'We provide excellent services' || heroSub === 'We provide quality services') return {}
    return c
  } catch {
    return {}
  }
}
