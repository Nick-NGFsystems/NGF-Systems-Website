'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { Tick } from '@/components/ui/FeatureItem'
import { EYEBROW } from '@/components/ui/SectionHeading'
import {
  TRACKS,
  MODULES,
  EXAMPLES,
  ALWAYS_INCLUDED,
  TERMS,
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
 *   1. HOW THEY PAY — monthly plan, or a one-time build they own.
 *   2. WHAT IT DOES — the base, plus any of four modules.
 *
 * A module with no confirmed figure renders "Quoted", never an invented
 * number. See the header of lib/pricing.ts for why that rule exists.
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
        className="inline-flex gap-1 rounded-xl border border-line bg-panel p-1"
      >
        {TRACKS.map((t) => (
          <button
            key={t.key}
            role="tab"
            type="button"
            aria-selected={trackKey === t.key}
            onClick={() => setTrackKey(t.key)}
            className={`rounded-lg px-5 py-2.5 text-[14.5px] font-semibold transition-colors ${
              trackKey === t.key ? 'bg-accent text-white' : 'text-muted hover:text-white'
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* ── The base ──────────────────────────────────────────────────────── */}
      <Card className="mt-8 overflow-hidden">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="border-b border-line p-7 sm:p-8 lg:border-b-0 lg:border-r">
            <h3 className="text-[18px] font-semibold text-white">Every site starts here</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{active.tagline}</p>

            <div className="mt-7 flex items-baseline gap-1.5">
              <span className="text-[44px] font-semibold tracking-tight text-white">
                {usd(active.baseCents)}
              </span>
              <span className="text-[17px] text-muted">{active.basePer}</span>
            </div>

            {active.setupNote && (
              <p className="mt-2 text-[14.5px] text-muted">
                {active.setupCents !== null
                  ? `plus ${usd(active.setupCents)} ${active.setupNote}`
                  : active.setupNote}
              </p>
            )}
            {!isMonthly && (
              <p className="mt-2 text-[14.5px] text-muted">
                plus {usd(TERMS.hostingCents)}/month hosting, cancel any time
              </p>
            )}

            <div className="mt-7 rounded-lg border border-line bg-ink/50 p-4">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-dim">
                Who owns it
              </p>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-white/85">
                {active.ownership}
              </p>
            </div>

            <ul className="mt-6 space-y-3">
              {active.terms.map((term) => (
                <Tick key={term}>{term}</Tick>
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

          <div className="bg-ink/40 p-7 sm:p-8">
            <h3 className="text-[18px] font-semibold text-white">Included on either option</h3>
            <ul className="mt-6 flex flex-col gap-5">
              {ALWAYS_INCLUDED.map((item) => (
                <li key={item.title}>
                  <p className="text-[15px] font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-muted">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* ── Decision 2: what it does ──────────────────────────────────────── */}
      <div className="mt-20">
        <p className={EYEBROW}>Add what you need</p>
        <h3 className="mt-4 text-[30px] font-semibold tracking-[-0.02em] text-white sm:text-[34px]">
          Then add what your business needs
        </h3>
        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-muted">
          We do not price by page count, because page count has nothing to do with the work. A
          three-page site that takes bookings is more to build and more to look after than a
          nine-page brochure. So you pay for what the site <em className="not-italic text-white">does</em>.
        </p>

        <ul className="mt-10 grid gap-5 lg:grid-cols-2">
          {MODULES.map((module) => (
            <Card as="li" key={module.key} className="flex flex-col p-6">
              <div className="flex items-start justify-between gap-4">
                <h4 className="text-[16.5px] font-semibold text-white">{module.name}</h4>
                <span className="shrink-0 rounded-md border border-line bg-panel px-2.5 py-1 text-[14px] font-semibold text-white">
                  {modulePrice(module.monthlyCents, module.oneTimeCents)}
                </span>
              </div>

              <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{module.summary}</p>

              <ul className="mt-5 space-y-2.5">
                {module.includes.map((line) => (
                  <Tick key={line}>{line}</Tick>
                ))}
              </ul>

              <div className="mt-5 flex-1" />

              <p className="border-t border-line pt-4 text-[13px] text-dim">
                Usually for: {module.bestFor}
              </p>
            </Card>
          ))}
        </ul>
      </div>

      {/* ── The arithmetic, done for them ─────────────────────────────────── */}
      <div className="mt-20">
        <p className={EYEBROW}>Worked examples</p>
        <h3 className="mt-4 text-[30px] font-semibold tracking-[-0.02em] text-white sm:text-[34px]">
          What that adds up to
        </h3>
        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-muted">
          Three shapes most businesses land on, priced on the {active.name.toLowerCase()}.
        </p>

        <ul className="mt-10 grid gap-5 lg:grid-cols-3">
          {EXAMPLES.map((example) => {
            const total = quote(trackKey, example.moduleKeys)
            return (
              <Card as="li" key={example.label} className="flex flex-col p-6">
                <p className={EYEBROW}>{example.label}</p>
                <p className="mt-3 text-[15px] font-medium text-white">{example.who}</p>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{example.rationale}</p>

                <div className="mt-6 flex-1" />

                <div className="border-t border-line pt-5">
                  {total === null ? (
                    <p className="text-[24px] font-semibold text-white">Quoted</p>
                  ) : (
                    <p className="flex items-baseline gap-1.5">
                      <span className="text-[30px] font-semibold tracking-tight text-white">
                        {usd(total)}
                      </span>
                      <span className="text-[14.5px] text-muted">{active.basePer}</span>
                    </p>
                  )}
                  {!isMonthly && (
                    <p className="mt-1 text-[13px] text-dim">
                      plus {usd(TERMS.hostingCents)}/month hosting
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
