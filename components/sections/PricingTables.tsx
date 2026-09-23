'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Icon from '@/components/ui/Icon'
import {
  TRACKS,
  MODULES,
  EXAMPLES,
  ALWAYS_INCLUDED,
  usd,
  quote,
  track,
  contactHref,
  type TrackKey,
} from '@/lib/pricing'

/**
 * Pricing, by what the site does.
 *
 * The buyer makes two decisions and they are kept visibly separate:
 *   1. HOW THEY PAY — monthly plan, or one-time build they own.
 *   2. WHAT IT DOES — the base, plus any of four modules.
 *
 * The old page crossed those two decisions into six tiers keyed on page
 * count, which meant a barber who wanted online booking had to buy a "Premium"
 * plan for the page allowance and a storefront he would never use.
 */
export default function PricingTables() {
  const [trackKey, setTrackKey] = useState<TrackKey>('monthly')
  const active = track(trackKey)
  const isMonthly = trackKey === 'monthly'

  const modulePrice = (monthlyCents: number | null, oneTimeCents: number | null) => {
    const cents = isMonthly ? monthlyCents : oneTimeCents
    if (cents === null) return 'Quoted'
    return isMonthly ? `+${usd(cents)}/mo` : `+${usd(cents)}`
  }

  return (
    <div>
      {/* ── Decision 1: how you pay ───────────────────────────────────────── */}
      <div
        role="tablist"
        aria-label="Payment option"
        className="inline-flex gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-900"
      >
        {TRACKS.map((t) => (
          <button
            key={t.key}
            role="tab"
            type="button"
            aria-selected={trackKey === t.key}
            onClick={() => setTrackKey(t.key)}
            className={`rounded-lg px-5 py-2.5 font-body text-sm font-semibold transition-colors ${
              trackKey === t.key
                ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* ── The base ──────────────────────────────────────────────────────── */}
      <Card className="mt-8 overflow-hidden">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="border-b border-slate-200 p-8 dark:border-slate-800 lg:border-b-0 lg:border-r">
            <h3 className="font-sora text-lg font-semibold text-slate-900 dark:text-white">
              Every site starts here
            </h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {active.tagline}
            </p>

            <div className="mt-7 flex items-baseline gap-1.5">
              <span className="font-sora text-5xl font-semibold tracking-tight text-slate-900 dark:text-white">
                {usd(active.baseCents)}
              </span>
              <span className="font-body text-lg text-slate-500 dark:text-slate-500">
                {active.basePer}
              </span>
            </div>

            {active.setupCents !== null && (
              <p className="mt-2 font-body text-sm text-slate-500 dark:text-slate-500">
                plus {usd(active.setupCents)} {active.setupNote}
              </p>
            )}
            {!isMonthly && (
              <p className="mt-2 font-body text-sm text-slate-500 dark:text-slate-500">
                plus $20/month hosting, cancel any time
              </p>
            )}

            <div className="mt-7 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-500">
                Who owns it
              </p>
              <p className="mt-1.5 font-body text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {active.ownership}
              </p>
            </div>

            <ul className="mt-6 flex flex-col gap-2.5">
              {active.terms.map((term) => (
                <li key={term} className="flex items-start gap-2.5">
                  <Icon
                    name="check"
                    className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400"
                  />
                  <span className="font-body text-sm text-slate-700 dark:text-slate-300">
                    {term}
                  </span>
                </li>
              ))}
            </ul>

            <Button
              href={contactHref(isMonthly ? 'Monthly plan' : 'One-time build')}
              size="lg"
              className="mt-8 w-full"
            >
              Get a free mockup
            </Button>
          </div>

          <div className="bg-slate-50 p-8 dark:bg-slate-950">
            <h3 className="font-sora text-lg font-semibold text-slate-900 dark:text-white">
              Included on either option
            </h3>
            <ul className="mt-6 flex flex-col gap-5">
              {ALWAYS_INCLUDED.map((item) => (
                <li key={item.title}>
                  <p className="font-body text-sm font-semibold text-slate-900 dark:text-white">
                    {item.title}
                  </p>
                  <p className="mt-1 font-body text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* ── Decision 2: what it does ──────────────────────────────────────── */}
      <div className="mt-20">
        <h3 className="font-sora text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Then add what your business needs
        </h3>
        <p className="mt-3 max-w-2xl font-body text-base leading-relaxed text-slate-600 dark:text-slate-400">
          We do not price by page count, because page count has nothing to do with the work. A
          three-page site that takes bookings is more to build and more to look after than a
          nine-page brochure. So you pay for what the site <em>does</em>.
        </p>

        <ul className="mt-10 grid gap-6 lg:grid-cols-2">
          {MODULES.map((module) => (
            <Card as="li" key={module.key} className="flex flex-col p-6">
              <div className="flex items-start justify-between gap-4">
                <h4 className="font-sora text-base font-semibold text-slate-900 dark:text-white">
                  {module.name}
                </h4>
                <span className="shrink-0 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-body text-sm font-semibold text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white">
                  {modulePrice(module.monthlyCents, module.oneTimeCents)}
                </span>
              </div>

              <p className="mt-3 font-body text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {module.summary}
              </p>

              <ul className="mt-5 flex flex-col gap-2">
                {module.includes.map((line) => (
                  <li key={line} className="flex items-start gap-2.5">
                    <Icon
                      name="check"
                      className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400"
                    />
                    <span className="font-body text-sm text-slate-700 dark:text-slate-300">
                      {line}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex-1" />

              <p className="border-t border-slate-200 pt-4 font-body text-xs text-slate-500 dark:border-slate-800 dark:text-slate-500">
                Usually for: {module.bestFor}
              </p>
            </Card>
          ))}
        </ul>
      </div>

      {/* ── The arithmetic, done for them ─────────────────────────────────── */}
      <div className="mt-20">
        <h3 className="font-sora text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          What that adds up to
        </h3>
        <p className="mt-3 max-w-2xl font-body text-base leading-relaxed text-slate-600 dark:text-slate-400">
          Three shapes most businesses land on, priced on the {active.name.toLowerCase()}.
        </p>

        <ul className="mt-10 grid gap-6 lg:grid-cols-3">
          {EXAMPLES.map((example) => {
            const total = quote(trackKey, example.moduleKeys)
            return (
              <Card as="li" key={example.label} className="flex flex-col p-6">
                <p className="font-body text-xs font-semibold uppercase tracking-[0.1em] text-blue-600 dark:text-blue-400">
                  {example.label}
                </p>
                <p className="mt-3 font-body text-sm font-medium text-slate-900 dark:text-white">
                  {example.who}
                </p>
                <p className="mt-2 font-body text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {example.rationale}
                </p>

                <div className="mt-6 flex-1" />

                <div className="border-t border-slate-200 pt-5 dark:border-slate-800">
                  {total === null ? (
                    <p className="font-sora text-2xl font-semibold text-slate-900 dark:text-white">
                      Quoted
                    </p>
                  ) : (
                    <p className="flex items-baseline gap-1.5">
                      <span className="font-sora text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                        {usd(total)}
                      </span>
                      <span className="font-body text-sm text-slate-500 dark:text-slate-500">
                        {active.basePer}
                      </span>
                    </p>
                  )}
                  {isMonthly && active.setupCents !== null && (
                    <p className="mt-1 font-body text-xs text-slate-500 dark:text-slate-500">
                      plus {usd(active.setupCents)} setup
                    </p>
                  )}
                  {!isMonthly && (
                    <p className="mt-1 font-body text-xs text-slate-500 dark:text-slate-500">
                      plus $20/month hosting
                    </p>
                  )}
                </div>
              </Card>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
