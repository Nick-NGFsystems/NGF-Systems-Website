import type { Metadata } from 'next'
import PageHeader from '@/components/ui/PageHeader'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import PricingTables from '@/components/sections/PricingTables'
import CallToAction from '@/components/sections/CallToAction'
import { PLANS, TERMS, TRACKS, hours, planFigures, usd } from '@/lib/pricing'

const [monthly, oneTime] = TRACKS
const website = planFigures('monthly', PLANS[0])

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'NGF Systems pricing, based on what your website does rather than how many pages it has. Monthly plans from $149/month plus setup, or a one-time build you own outright from $2,500. Every price is on the page.',
  alternates: { canonical: '/pricing' },
}

const FAQ: { q: string; a: string }[] = [
  {
    q: 'Why is there no price per page?',
    a: 'Because page count has almost nothing to do with the work. A three-page site that takes bookings and payments is more to build and far more to look after than a nine-page brochure. Pricing by pages meant charging the wrong people too much and the right people too little, and it made adding a page feel like a penalty.',
  },
  {
    q: 'What does a website actually cost, all in?',
    a: `On a monthly plan you pay a setup fee once, then the monthly price. Setup covers the build and your first month, so the first year of the Website plan is ${usd(website.setupCents ?? 0)} plus eleven payments of ${usd(website.priceCents)}, which is ${usd(website.firstYearCents)} in total. Nothing else is billed unless you ask for work beyond your included time, and that is always estimated first.`,
  },
  {
    q: 'What happens if I want to leave?',
    a: `On the monthly plan you can cancel at any time, with no minimum term. The site is owned by us, so it comes down when the plan ends, and we hand over your content and point your domain wherever you like. If you want to keep the site itself, after ${TERMS.buyoutAfterMonths} months you can buy it outright for ${TERMS.buyoutMonthsOfFee} months of your plan fee. On a one-time build you already own the code, so nothing changes; you can move it or keep us hosting it.`,
  },
  {
    q: 'Who owns my domain?',
    a: 'You do, on either option. We will register it for you or point one you already have, but it is registered in your name and you can take it with you.',
  },
  {
    q: 'What counts as a change I can make myself?',
    a: 'Any text or image on the site. Prices, opening hours, service descriptions, staff photos, gallery images — you change them in the portal and publish. You do not need us and you are not billed for it.',
  },
  {
    q: 'And what would I ask you to do?',
    a: `Anything structural — a new page, a new section, a design change, a new system. Every monthly plan includes some of our time each month, from ${hours(monthly.includedMinutes)} on the Website plan up to ${hours(planFigures('monthly', PLANS[2]).includedMinutes)} with a store. Beyond that, and on a one-time build, it is ${usd(TERMS.maintenanceRateCents)} an hour in ${TERMS.maintenanceMinimumMinutes}-minute increments, and we tell you the estimate before we start. Unused time does not carry over to the next month.`,
  },
  {
    q: 'Will my price go up?',
    a: `Not for ${TERMS.priceLockMonths} months. Your monthly price is locked from the day your site launches, and we would tell you well ahead of any change after that.`,
  },
  {
    q: 'Why does a one-time build cost more up front?',
    a: `Because you are buying the code outright, so the whole build is paid at once rather than spread across a plan. It starts from ${usd(oneTime.baseCents)}, and you only pay for hosting or changes if you want them from us.`,
  },
  {
    q: 'Do I really not pay for the mockup?',
    a: 'No. We build a real design of your actual site first. If you do not want to go ahead after seeing it, you owe nothing and we part on good terms.',
  },
  {
    q: 'Can I add booking or a store later?',
    a: 'Yes, and that is the point of pricing this way. The systems are switched on per business, so you can start with the website and add booking the month you need it, without rebuying a tier.',
  },
]

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Priced by what your site does, not how many pages it has"
        subtitle="Pick the plan that matches what your site needs to do, then choose to pay monthly or once. Every price is on this page, including what the first year costs."
      />

      <Section bleed width="wide">
        <PricingTables />
      </Section>

      <Section>
        <SectionHeading
          eyebrow="The details"
          title="The things people ask before they sign"
          subtitle="If the answer you need is not here, ask — we would rather have the awkward conversation now than after you have paid."
        />

        <dl className="mt-14 flex flex-col divide-y divide-line border-y border-line">
          {FAQ.map(({ q, a }) => (
            <div key={q} className="py-7">
              <dt className="text-[16.5px] font-semibold text-head">{q}</dt>
              <dd className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-muted">{a}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-10 max-w-2xl text-[14px] leading-relaxed text-dim">
          Monthly plans are billed automatically. Overdue invoices carry a{' '}
          {TERMS.lateFeePctPerMonth}% monthly late fee, and restarting a site paused for
          non-payment is {usd(TERMS.reactivationFeeCents)}.
        </p>
      </Section>

      <CallToAction
        title="Not sure which of these you need?"
        body="Tell us what your business does and we will tell you which of it you actually need — including the parts you can skip."
      />
    </>
  )
}
