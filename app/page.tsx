import Link from 'next/link'
import Hero from '@/components/sections/Hero'
import WhatYouGet from '@/components/sections/WhatYouGet'
import WorkGrid from '@/components/sections/WorkGrid'
import Process from '@/components/sections/Process'
import CallToAction from '@/components/sections/CallToAction'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Icon from '@/components/ui/Icon'
import { getNgfContent } from '@/lib/ngf'
import { FEATURED_CLIENTS } from '@/lib/clients'
import { TRACKS, usd } from '@/lib/pricing'
import { PORTAL_URL } from '@/lib/nav'

export default async function HomePage() {
  const ngf = await getNgfContent()
  const [monthly, oneTime] = TRACKS

  return (
    <>
      <Hero ngf={ngf} />
      <WhatYouGet ngf={ngf} />

      <Section id="work">
        <SectionHeading
          eyebrow="Recent work"
          title={ngf?.work?.title || 'Every one of these is live.'}
          subtitle={
            ngf?.work?.subtitle ||
            'Six businesses across six industries. Click any of them and you are on a site we built and still look after today.'
          }
          ngfSection="Work"
          ngfTitleField="work.title"
          ngfSubtitleField="work.subtitle"
        />
        <div className="mt-12">
          <WorkGrid clients={FEATURED_CLIENTS} />
        </div>
        <div className="mt-10">
          <Button href="/work" variant="secondary">
            See all six
            <Icon name="arrow-right" className="h-4 w-4" />
          </Button>
        </div>
      </Section>

      <Process />

      <Section id="pricing">
        <SectionHeading
          eyebrow="Pricing"
          title={ngf?.pricing?.title || 'Priced by what your site does. Never by page count.'}
          subtitle={
            ngf?.pricing?.subtitle ||
            'Pick how you want to pay, then add only the things your business actually needs. No page allowances, and no tier you have to buy for one feature.'
          }
          ngfSection="Pricing"
          ngfTitleField="pricing.title"
          ngfSubtitleField="pricing.subtitle"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {[monthly, oneTime].map((t) => (
            <Card key={t.key} className="p-6">
              <h3 className="text-[16.5px] font-semibold text-white">{t.name}</h3>
              <p className="mt-4 flex items-baseline gap-1.5">
                <span className="text-[38px] font-semibold tracking-tight text-white">
                  {usd(t.baseCents)}
                </span>
                <span className="text-[16px] text-muted">{t.basePer}</span>
              </p>
              <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{t.tagline}</p>
            </Card>
          ))}
        </div>

        <div className="mt-10">
          <Button href="/pricing" variant="secondary">
            See the full pricing
            <Icon name="arrow-right" className="h-4 w-4" />
          </Button>
        </div>
      </Section>

      <CallToAction />

      {/* Existing clients. Small, and last — a different audience. */}
      <Section className="!py-10">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-[14.5px] text-muted">
            Already an NGF Systems client? Your portal is where your site, enquiries and invoices
            live.
          </p>
          <Link
            href={PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 text-[14.5px] font-medium text-accent-light hover:underline underline-offset-4"
          >
            Sign in to your portal
            <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
        </div>
      </Section>
    </>
  )
}
