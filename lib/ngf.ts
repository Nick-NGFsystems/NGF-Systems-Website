const NGF_CLIENT_ID = process.env.NGF_CLIENT_ID || 'cmnxxexlo00018q1up7l3jf3m'
const NGF_API = 'https://app.ngfsystems.com'

export interface NgfHero {
  headline?: string
  subheadline?: string
  ctaText?: string
  ctaLink?: string
}

export interface NgfService {
  id: string
  title: string
  description: string
}

export interface NgfContent {
  hero?: NgfHero
  about?: { title?: string; body?: string }
  services?: NgfService[]
  contact?: { phone?: string; email?: string; address?: string; hours?: string }
  brand?: { businessName?: string; tagline?: string; primaryColor?: string; secondaryColor?: string }
  gallery?: string[]
  seo?: { metaTitle?: string; metaDescription?: string }
}

export async function getNgfContent(): Promise<NgfContent> {
  try {
    const res = await fetch(`${NGF_API}/api/public/website/${NGF_CLIENT_ID}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return {}
    const data = await res.json() as { content?: NgfContent }
    return data.content ?? {}
  } catch {
    return {}
  }
}

export { NGF_CLIENT_ID, NGF_API }
