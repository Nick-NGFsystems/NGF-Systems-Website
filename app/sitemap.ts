import { MetadataRoute } from 'next'
import { ROUTES } from '@/lib/nav'

/**
 * Every route, from the one nav table in lib/nav.ts — adding a page to the
 * nav adds it here. The old sitemap listed only the home page, so the five
 * new pages would have been invisible to search.
 *
 * The host comes from NEXT_PUBLIC_SITE_URL when it is set. It must never fall
 * back to a placeholder domain: two sites in the fleet were telling Google
 * their pages lived on example.com (editor audit, P1.2).
 */
const BASE = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ngfsystems.com')
  .replace(/\/+$/, '')
  .replace(/^(?!https?:\/\/)/, 'https://')

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return ROUTES.map((route) => ({
    url: route === '/' ? BASE : `${BASE}${route}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1 : 0.8,
  }))
}
