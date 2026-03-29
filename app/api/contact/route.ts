import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, business } = body

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 }
      )
    }

    const { error } = await resend.emails.send({
      from: 'NGFsystems <noreply@ngfsystems.com>',
      to: 'nick@ngfsystems.com',
      replyTo: email,
      subject: `New inquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f8fafc; border-radius: 12px;">
          <div style="background: #2563eb; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
            <h1 style="color: white; margin: 0; font-size: 20px;">New Website Inquiry</h1>
            <p style="color: #bfdbfe; margin: 4px 0 0; font-size: 14px;">via ngfsystems.com</p>
          </div>
          <div style="background: white; border-radius: 8px; padding: 24px; border: 1px solid #e2e8f0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 12px 0; font-size: 13px; color: #64748b; width: 120px;">Name</td>
                <td style="padding: 12px 0; font-size: 14px; color: #0f172a; font-weight: 600;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 12px 0; font-size: 13px; color: #64748b;">Email</td>
                <td style="padding: 12px 0; font-size: 14px; color: #2563eb;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; font-size: 13px; color: #64748b; vertical-align: top;">Business</td>
                <td style="padding: 12px 0; font-size: 14px; color: #0f172a;">${business || 'Not provided'}</td>
              </tr>
            </table>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #94a3b8; text-align: center;">
            Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
