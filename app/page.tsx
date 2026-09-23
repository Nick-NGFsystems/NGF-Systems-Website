import Link from 'next/link'
import Hero from '@/components/sections/Hero'
import WhatWeDo from '@/components/sections/WhatWeDo'
import PortalShowcase from '@/components/sections/PortalShowcase'
import WorkGrid from '@/components/sections/WorkGrid'
import Process from '@/components/sections/Process'
import CallToAction from '@/components/sections/CallToAction'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import { getNgfContent } from '@/lib/ngf'
import { FEATURED_CLIENTS } from '@/lib/clients'
import { TRACKS, usd } from '@/lib/pricing'

export default async function HomePage() {
  const ngf = await getNgfContent()
  const [monthly, oneTime] = TRACKS

  return (
    <>
      <Hero ngf={ngf} />
      <WhatWeDo ngf={ngf} />
      <PortalShowcase />

      <Section id="work" tone="muted" width="wide">
        <SectionHeading
          eyebrow="Recent work"
          title={ngf?.work?.title || 'Sites we built and still run today'}
          subtitle={
            ngf?.work?.subtitle ||
            'Every one of these is live right now. Click through and see for yourself.'
          }
          ngfSection="Work"
          ngfTitleField="work.title"
          ngfSubtitleField="work.subtitle"
        />
        <div className="mt-14">
          <WorkGrid clients={FEATURED_CLIENTS} />
        </div>
        <div className="mt-10">
          <Button href="/work" variant="secondary">
            See all our work
            <Icon name="arrow-right" className="h-4 w-4" />
          </Button>
        </div>
      </Section>

      <Process tone="default" />

      {/* A pricing summary, not a second pricing page. */}
      <Section id="pricing" tone="muted">
        <SectionHeading
          eyebrow="Pricing"
          title={ngf?.pricing?.title || 'Priced by what your site does, not how many pages it has'}
          subtitle={
            ngf?.pricing?.subtitle ||
            'Pick how you want to pay, then add only the things your business actually needs. No page allowances, no tier you have to buy for one feature.'
          }
          ngfSection="Pricing"
          ngfTitleField="pricing.title"
          ngfSubtitleField="pricing.subtitle"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {[monthly, oneTime].map((t) => (
            <div
              key={t.key}
              className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950"
            >
              <h3 className="font-sora text-base font-semibold text-slate-900 dark:text-white">
                {t.name}
              </h3>
              <p className="mt-4 flex items-baseline gap-1.5">
                <span className="font-sora text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
                  {usd(t.baseCents)}
                </span>
                <span className="font-body text-base text-slate-500 dark:text-slate-500">
                  {t.basePer}
                </span>
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {t.tagline}
              </p>
            </div>
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

      {/* Existing clients. Small, and last — it is a different audience. */}
      <Section tone="default" className="!py-12">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="font-body text-sm text-slate-600 dark:text-slate-400">
            Already an NGF Systems client? Your portal is where your site, enquiries and invoices
            live.
          </p>
          <Link
            href="https://app.ngfsystems.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 font-body text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400 underline-offset-4"
          >
            Sign in to your portal
            <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
        </div>
      </Section>
    </>
  )
}
