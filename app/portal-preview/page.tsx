import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/ui/PageHeader'
import Section from '@/components/ui/Section'
import PortalMock from '@/components/sections/PortalMock'
import PortalShowcase from '@/components/sections/PortalShowcase'
import CallToAction from '@/components/sections/CallToAction'

export const metadata: Metadata = {
  title: 'Look inside the portal',
  description:
    'A preview of the client portal every NGF Systems site comes with — edit your own content, read every enquiry, take bookings and settle invoices, all in one account.',
  alternates: { canonical: '/portal-preview' },
}

export default function PortalPreviewPage() {
  return (
    <>
      <PageHeader
        eyebrow="Your portal"
        title="This is what you get the keys to"
        subtitle="Every site we build comes with an account here. It is where your words and pictures, your enquiries, your bookings and your invoices all live. Click through the tabs below — the content is placeholder, the layout is the real thing."
      />

      <Section bleed>
        <PortalMock />
      </Section>

      <PortalShowcase />

      <Section>
        <div className="max-w-2xl">
          <h2 className="text-[26px] font-semibold leading-[1.2] tracking-[-0.025em] text-head sm:text-[30px]">
            You only see the parts you use
          </h2>
          <p className="mt-4 text-[16.5px] leading-[1.65] text-muted">
            The tabs above are not a fixed set. A jeweller who never takes appointments does not get
            a bookings diary, and a restaurant that does not ship anything does not get an orders
            screen. We switch on what your business actually does and leave the rest out, which is
            why the portal stays something you can learn in an afternoon rather than a system you
            need training for.
          </p>
          <p className="mt-4 text-[16.5px] leading-[1.65] text-muted">
            Already a client?{' '}
            <Link
              href="https://app.ngfsystems.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent underline underline-offset-4 hover:text-accent-hover"
            >
              Sign in to the real one
            </Link>
            .
          </p>
        </div>
      </Section>

      <CallToAction />
    </>
  )
}
