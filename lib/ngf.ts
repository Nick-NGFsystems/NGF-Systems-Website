const NGF_API = 'https://app.ngfsystems.com'

// If NGF_CLIENT_ID is explicitly set, use it directly (legacy / manual override).
// Otherwise, auto-detect by domain — works for any client site with zero env var setup.
// Vercel automatically sets VERCEL_PROJECT_PRODUCTION_URL to the production domain.
const NGF_CLIENT_ID = process.env.NGF_CLIENT_ID

function getSiteDomain(): string {
  return (
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
          process.env.NEXT_PUBLIC_SITE_URL ||
              'ngfsystems.com'
                )
                }

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
                                    let url: string

                                        if (NGF_CLIENT_ID) {
                                              // Explicit override — use client ID directly
                                                    url = `${NGF_API}/api/public/website/${NGF_CLIENT_ID}`
                                                        } else {
                                                              // Auto-detect: look up content by this site's domain.
                                                                    // No env var needed — just deploy and it connects automatically.
                                                                          const domain = getSiteDomain()
                                                                                  .replace(/^https?:\/\//, '')
                                                                                          .replace(/^www\./, '')
                                                                                                  .replace(/\/$/, '')
                                                                                                        url = `${NGF_API}/api/public/website/by-domain/${encodeURIComponent(domain)}`
                                                                                                            }

                                                                                                                const res = await fetch(url, { cache: 'no-store' })
                                                                                                                    if (!res.ok) return {}
                                                                                                                        const data = await res.json() as { content?: NgfSiteContent }
                                                                                                                            return data.content ?? {}
                                                                                                                              } catch {
                                                                                                                                  return {}
                                                                                                                                    }
                                                                                                                                    }