import type { Metadata } from 'next'
import PageHeader from '@/components/ui/PageHeader'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import PricingTables from '@/components/sections/PricingTables'
import CallToAction from '@/components/sections/CallToAction'
import { TERMS, usd } from '@/lib/pricing'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'NGF Systems pricing, based on what your website does rather than how many pages it has. Monthly managed plans from $100/month, or a one-time build you own outright from $600.',
  alternates: { canonical: '/pricing' },
}

const FAQ: { q: string; a: string }[] = [
  {
    q: 'Why is there no price per page?',
    a: 'Because page count has almost nothing to do with the work. A three-page site that takes bookings and payments is more to build and far more to look after than a nine-page brochure. Pricing by pages meant charging the wrong people too much and the right people too little, and it made adding a page feel like a penalty.',
  },
  {
    q: 'Why do some things say "Quoted" instead of a price?',
    a: 'Because we would rather say nothing than publish a number we have not stood behind. Anything shown as Quoted is priced with your mockup, before you commit to anything.',
  },
  {
    q: 'What happens if I want to leave?',
    a: 'On the monthly plan you can cancel at any time — there is no minimum term. The site was built and is owned by us, so it comes down when the plan ends, and we will hand over your content and point your domain wherever you like. On a one-time build you already own the code, so nothing changes; you can move it or keep us hosting it.',
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
    a: `Anything structural — a new page, a new section, a design change, a new system. On the monthly plan ordinary requests are included. On a one-time build they are billed at ${usd(TERMS.maintenanceRateCents)} an hour in ${TERMS.maintenanceMinimumMinutes}-minute increments, and we tell you the estimate before we start.`,
  },
  {
    q: 'Do I really not pay for the mockup?',
    a: `No. We build a real design of your actual site first, with ${TERMS.freeMockupRevisionRounds} rounds of revisions included. If you do not want to go ahead after seeing it, you owe nothing and we part on good terms.`,
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
        subtitle="Two decisions: how you want to pay for the build, and what the site needs to do. Nothing else changes the price, and there is nothing you have to buy to unlock something else."
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
              <dt className="text-[16.5px] font-semibold text-white">{q}</dt>
              <dd className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-muted">{a}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-10 max-w-2xl text-[14px] leading-relaxed text-dim">
          Overdue invoices carry a {TERMS.lateFeePctPerMonth}% monthly late fee. Longer term
          commitments are available at a discount if you want one, but we never ask for one.
        </p>
      </Section>

      <CallToAction
        title="Not sure which of these you need?"
        body="Tell us what your business does and we will tell you which of it you actually need — including the parts you can skip."
      />
    </>
  )
}
