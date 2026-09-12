import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

/**
 * GET /api/revalidate?secret=<secret>
 *
 * Called by the NGF portal's push handler after a publish. The portal sends
 * whatever secret it holds for this site and has no idea what the env var here
 * is called — and this route read REVALIDATION_SECRET, a name the portal can
 * never satisfy, so instant publish has never worked for this site.
 *
 * Both names are accepted, canonical first, so there is no window in which the
 * site is broken between this change shipping and WEBSITE_REVALIDATION_SECRET
 * being set on the Vercel project. Drop the REVALIDATION_SECRET fallback once
 * the canonical var is set on production AND preview.
 *
 * Still fail-closed, but it now distinguishes the two ways of failing, matching
 * ngf-client-starter and the other ten site repos: 503 when NO secret is
 * configured here at all, 401 when one is and the caller got it wrong. The
 * portal treats both as a failed publish (`revalidated = res.ok`), but the
 * health check reads them very differently — 503 is proof instant publish is
 * broken for this site, whereas 401 only proves some secret exists.
 */
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  const expected = process.env.WEBSITE_REVALIDATION_SECRET || process.env.REVALIDATION_SECRET
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: 'WEBSITE_REVALIDATION_SECRET is not set on this site' },
      { status: 503 },
    )
  }
  if (secret !== expected) {
    return NextResponse.json({ ok: false, error: 'Invalid secret' }, { status: 401 })
  }
  revalidateTag('ngf-content')
  return NextResponse.json({ ok: true, revalidated: true })
}
