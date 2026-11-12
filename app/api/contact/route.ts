import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { CONTACT_INTENTS } from '@/lib/pricing'

/**
 * The enquiry endpoint for ngfsystems.com.
 *
 * Order matters here. The enquiry is PERSISTED to the central lead store
 * before anything is emailed, because a lead that exists only in a Resend
 * delivery is lost the moment Resend has a bad day — which is the failure
 * `scripts/ngf-doctor.mjs` exists to catch ("Lead capture reaches the
 * portal"). Previously the ingest ran after the send and was skipped entirely
 * when the send failed, so an outage dropped the enquiry with no record
 * anywhere.
 */

const MAX = { name: 200, email: 320, business: 5_000, intent: 100 } as const

/** Resend is constructed per request. At module scope a missing key throws during `next build`. */
function mailer(): Resend | null {
  const key = process.env.RESEND_API_KEY
  return key ? new Resend(key) : null
}

/**
 * Escape before interpolating into the notification email. Every value below
 * is attacker-supplied: without this, a submitted "business" containing markup
 * is rendered as live HTML in the inbox that reads these notifications.
 */
function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Deliberately permissive — just enough to reject what cannot be an address. */
function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function clean(value: unknown, limit: number): string {
  return typeof value === 'string' ? value.trim().slice(0, limit) : ''
}

interface Lead {
  name: string
  email: string
  business: string
  intent: string
}

/** Returns whether the lead was persisted. Never throws. */
async function ingestLead(lead: Lead): Promise<boolean> {
  try {
    const res = await fetch('https://app.ngfsystems.com/api/leads/ingest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.LEADS_API_SECRET ?? '',
      },
      body: JSON.stringify(lead),
    })
    const result = (await res.json()) as { success?: boolean; error?: string }
    if (!result.success) console.error('Lead ingest returned failure:', result.error)
    return result.success === true
  } catch (err) {
    console.error('Lead ingest fetch failed:', err)
    return false
  }
}

/** Returns whether the notification was sent. Never throws. */
async function notify(lead: Lead): Promise<boolean> {
  const resend = mailer()
  if (!resend) {
    console.error('RESEND_API_KEY is not set — enquiry stored but no email sent.')
    return false
  }

  const row = (label: string, value: string) => `
    <tr style="border-bottom:1px solid #f1f5f9">
      <td style="padding:12px 0;font-size:13px;color:#64748b;width:120px;vertical-align:top">${esc(label)}</td>
      <td style="padding:12px 0;font-size:14px;color:#0f172a">${esc(value)}</td>
    </tr>`

  try {
    const { error } = await resend.emails.send({
      from: 'NGF Systems <noreply@ngfsystems.com>',
      to: 'nick@ngfsystems.com',
      replyTo: lead.email,
      subject: lead.intent
        ? `New enquiry — ${lead.intent} — from ${lead.name}`
        : `New enquiry from ${lead.name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#f8fafc">
          <div style="background:#2563eb;border-radius:8px;padding:24px;margin-bottom:24px">
            <h1 style="color:#fff;margin:0;font-size:20px">New website enquiry</h1>
            <p style="color:#bfdbfe;margin:4px 0 0;font-size:14px">via ngfsystems.com</p>
          </div>
          ${
            lead.intent
              ? `<div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:14px 18px;margin-bottom:16px">
                   <p style="margin:0;font-size:13px;color:#1d4ed8;font-weight:600">Enquiring about: ${esc(lead.intent)}</p>
                 </div>`
              : ''
          }
          <div style="background:#fff;border-radius:8px;padding:24px;border:1px solid #e2e8f0">
            <table style="width:100%;border-collapse:collapse">
              ${row('Name', lead.name)}
              ${row('Email', lead.email)}
              ${row('Business', lead.business || 'Not provided')}
            </table>
          </div>
          <p style="margin-top:20px;font-size:12px;color:#94a3b8;text-align:center">
            Reply directly to this email to respond to ${esc(lead.name)}.
          </p>
        </div>`,
    })

    if (error) {
      console.error('Resend error:', error)
      return false
    }
    return true
  } catch (err) {
    console.error('Resend threw:', err)
    return false
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Record<string, unknown>

    const name = clean(body.name, MAX.name)
    const email = clean(body.email, MAX.email)
    const business = clean(body.business, MAX.business)
    const rawIntent = clean(body.intent, MAX.intent)

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 },
      )
    }
    if (!looksLikeEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'That email address does not look right' },
        { status: 400 },
      )
    }

    // The browser already restricts this, but the endpoint is public: an
    // arbitrary intent would otherwise be stored against the lead and shown
    // in the notification.
    const intent = CONTACT_INTENTS.includes(rawIntent) ? rawIntent : ''

    const lead: Lead = { name, email, business, intent }

    // Persist first, notify second — see the note at the top of this file.
    const stored = await ingestLead(lead)
    const emailed = await notify(lead)

    // The enquiry is safe if EITHER landed. Only tell the visitor it failed
    // when it reached neither the portal nor the inbox.
    if (!stored && !emailed) {
      return NextResponse.json(
        { success: false, error: 'Could not record your enquiry' },
        { status: 502 },
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
