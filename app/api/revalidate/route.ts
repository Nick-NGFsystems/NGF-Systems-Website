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
 * Fail-closed behaviour is deliberately unchanged: with neither var set every
 * request is still rejected 401, exactly as before.
 */
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  const expected = process.env.WEBSITE_REVALIDATION_SECRET || process.env.REVALIDATION_SECRET
  if (!expected || secret !== expected) {
    return NextResponse.json({ ok: false, error: 'Invalid secret' }, { status: 401 })
  }
  revalidateTag('ngf-content')
  return NextResponse.json({ ok: true, revalidated: true })
}
