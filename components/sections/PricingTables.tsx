'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { Tick } from '@/components/ui/FeatureItem'
import { EYEBROW } from '@/components/ui/SectionHeading'
import {
  TRACKS,
  PLANS,
  ALWAYS_INCLUDED,
  TERMS,
  usd,
  hours,
  quote,
  setupQuote,
  track,
  planFigures,
  contactHref,
  type TrackKey,
} from '@/lib/pricing'

/**
 * Pricing, laid out so "what will my website cost?" is answered at a glance.
 *
 *   1. A toggle: pay monthly, or pay once and own it.
 *   2. Three plans side by side, each with its price, its setup, what is
 *      included and what the first year costs all in.
 *   3. What every plan includes.
 *   4. What anything else costs after launch, so nothing is a surprise later.
 *
 * Every figure comes from lib/pricing.ts. No number is typed in here.
 */
export default function PricingTables() {
  const [trackKey, setTrackKey] = useState<TrackKey>('monthly')
  const active = track(trackKey)
  const isMonthly = trackKey === 'monthly'

  const bothMonthly = quote('monthly', ['booking', 'store'])
  const bothSetup = setupQuote(['booking', 'store'])

  const afterLaunch = [
    {
      label: 'Changes beyond your included time',
      value: `${usd(TERMS.maintenanceRateCents)}/hour in ${TERMS.maintenanceMinimumMinutes}-minute steps, estimated before we start`,
    },
    {
      label: 'Hosting for a site you own',
      value: `${usd(TERMS.hostingCents)}/month, cancel any time`,
    },
    {
      label: 'Care for a site you own',
      value: `${usd(TERMS.careCents)}/month, hosting plus ${hours(TERMS.careIncludedMinutes)} of changes`,
    },
    {
      label: 'Custom development',
      value: `From ${usd(TERMS.customMinimumCents)}, quoted per job`,
    },
    {
      label: 'Buying your monthly site outright',
      value: `After ${TERMS.buyoutAfterMonths} months, for ${TERMS.buyoutMonthsOfFee} months of your plan fee`,
    },
    {
      label: 'Your monthly price',
      value: `Locked for ${TERMS.priceLockMonths} months from launch`,
    },
  ]

  return (
    <div>
      {/* ── How you pay ───────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="tablist"
          aria-label="Payment option"
          className="inline-flex w-fit gap-1 rounded-xl border border-line bg-panel p-1"
        >
          {TRACKS.map((t) => (
            <button
              key={t.key}
              role="tab"
              type="button"
              aria-selected={trackKey === t.key}
              onClick={() => setTrackKey(t.key)}
              className={`rounded-lg px-5 py-2.5 text-[14.5px] font-semibold transition-colors ${
                trackKey === t.key ? 'bg-accent text-white' : 'text-muted hover:text-head'
              }`}
            >
              {t.toggleLabel}
            </button>
          ))}
        </div>
        <p className="max-w-md text-[14.5px] leading-relaxed text-muted">{active.ownership}</p>
      </div>

      {/* ── The three plans ───────────────────────────────────────────────── */}
      <ul role="tabpanel" className="mt-10 grid gap-5 lg:grid-cols-3">
        {PLANS.map((plan) => {
          const f = planFigures(trackKey, plan)
          const intent = plan.key === 'website' && !isMonthly ? 'One-time build' : plan.intent
          return (
            <Card as="li" key={plan.key} className="flex flex-col p-7">
              <h3 className="text-[19px] font-semibold text-head">{plan.name}</h3>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted lg:min-h-[46px]">
                {plan.who}
              </p>

              <p className="mt-5 flex items-baseline gap-1.5">
                {f.priceFrom && <span className="text-[15px] text-muted">From</span>}
                <span className="text-[40px] font-semibold tracking-tight text-head">
                  {usd(f.priceCents)}
                </span>
                <span className="text-[16px] text-muted">{active.basePer}</span>
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-muted lg:min-h-[44px]">
                {isMonthly && f.setupCents !== null
                  ? `Plus ${f.setupFrom ? 'from ' : ''}${usd(f.setupCents)} setup, which covers the build and your first month`
                  : `Plus hosting at ${usd(TERMS.hostingCents)}/month, or ${usd(TERMS.careCents)}/month with ${hours(TERMS.careIncludedMinutes)} of changes`}
              </p>

              <dl className="mt-6 space-y-3 border-y border-line py-5 text-[14.5px]">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Changes by us</dt>
                  <dd className="text-right font-medium text-head">
                    {isMonthly
                      ? `${hours(f.includedMinutes)} a month included`
                      : `${usd(TERMS.maintenanceRateCents)}/hour`}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">{isMonthly ? 'Requests answered' : 'Who owns it'}</dt>
                  <dd className="text-right font-medium text-head">
                    {!isMonthly
                      ? 'You do'
                      : plan.replyBusinessDays === 1
                        ? 'Next business day'
                        : `Within ${plan.replyBusinessDays} business days`}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">First year, all in</dt>
                  <dd className="text-right font-semibold text-head">
                    {f.setupFrom ? 'From ' : ''}
                    {usd(f.firstYearCents)}
                  </dd>
                </div>
              </dl>

              <ul className="mt-5 space-y-2.5">
                {plan.highlights.map((line) => (
                  <Tick key={line}>{line}</Tick>
                ))}
              </ul>

              <div className="mt-7 flex-1" />

              <Button href={contactHref(intent)} variant="secondary" className="w-full">
                Start with a free mockup
              </Button>
            </Card>
          )
        })}
      </ul>

      <p className="mt-6 max-w-3xl text-[14.5px] leading-relaxed text-muted">
        {isMonthly
          ? `First year all in is the setup plus eleven monthly payments.${
              bothMonthly !== null && bothSetup !== null
                ? ` Need booking and a store? That is ${usd(bothMonthly)}/month with from ${usd(bothSetup)} setup.`
                : ''
            }`
          : 'First year all in is the build plus twelve months of hosting with us. You are free to host it anywhere else.'}{' '}
        Anything else is quoted in writing before any work starts.
      </p>

      {/* ── Every plan includes ───────────────────────────────────────────── */}
      <div className="mt-20">
        <p className={EYEBROW}>Every plan includes</p>
        <ul className="mt-6 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {ALWAYS_INCLUDED.map((item) => (
            <li key={item.title}>
              <p className="text-[15.5px] font-semibold text-head">{item.title}</p>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* ── After launch ──────────────────────────────────────────────────── */}
      <div className="mt-20">
        <p className={EYEBROW}>After launch</p>
        <h3 className="mt-3 text-[22px] font-semibold tracking-tight text-head">
          What anything else costs
        </h3>
        <dl className="mt-6 max-w-3xl divide-y divide-line border-y border-line">
          {afterLaunch.map(({ label, value }) => (
            <div
              key={label}
              className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
            >
              <dt className="text-[15px] text-head">{label}</dt>
              <dd className="text-[15px] text-muted sm:text-right">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
