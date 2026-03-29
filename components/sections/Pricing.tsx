'use client'

import { useState } from 'react'
import Link from 'next/link'

type BillingTab = 'monthly' | 'onetime'

interface PlanFeature {
  text: string
  bold?: boolean
}

interface Plan {
  name: string
  badge?: string
  setupFee: string
  setupNote: string
  price: string
  priceSuffix: string
  priceNote: string
  description: string
  hostingCallout?: string
  features: PlanFeature[]
  cta: string
  ctaHref: string
  highlighted: boolean
}

const monthlyPlans: Plan[] = [
  {
    name: 'Starter',
    setupFee: '$150',
    setupNote: 'one-time setup fee',
    price: '$100',
    priceSuffix: '/mo',
    priceNote: 'billed monthly',
    description: 'A complete website for local businesses ready to get online and look professional.',
    features: [
      { text: 'Hosting & storage included', bold: true },
      { text: 'SSL certificate included', bold: true },
      { text: '5 pages included' },
      { text: 'Mobile responsive design' },
      { text: 'Contact form with email notifications' },
      { text: 'Basic SEO setup' },
      { text: 'Monthly updates included' },
      { text: 'Email support' },
      { text: '$100 referral bonus', bold: true },
    ],
    cta: 'Get Started',
    ctaHref: '#contact',
    highlighted: false,
  },
  {
    name: 'Professional',
    badge: 'Most Popular',
    setupFee: '$300',
    setupNote: 'one-time setup fee',
    price: '$250',
    priceSuffix: '/mo',
    priceNote: 'billed monthly',
    description: 'For growing businesses that need more pages, a gallery, and hands-on monthly support.',
    features: [
      { text: 'Hosting & storage included', bold: true },
      { text: 'SSL certificate included', bold: true },
      { text: '7–10 pages included' },
      { text: 'Admin panel' },
      { text: 'Photo & project gallery with upload' },
      { text: 'Google Analytics integration' },
      { text: 'Social media integration' },
      { text: '2 hours/month changes included' },
      { text: 'Priority email support' },
      { text: '$250 referral bonus', bold: true },
    ],
    cta: 'Get Started',
    ctaHref: '#contact',
    highlighted: true,
  },
  {
    name: 'Premium',
    setupFee: '$600',
    setupNote: 'one-time setup fee',
    price: '$400',
    priceSuffix: '/mo',
    priceNote: 'billed monthly',
    description: 'The full package — bookings, payments, portals, and a dedicated team behind your site.',
    features: [
      { text: 'Hosting & storage included', bold: true },
      { text: 'SSL certificate included', bold: true },
      { text: 'Unlimited pages' },
      { text: 'Advanced features (booking, payments)' },
      { text: 'Custom integrations (CRM, scheduling)' },
      { text: 'Customer portals' },
      { text: 'Monthly performance reports' },
      { text: '5 hours/month changes included' },
      { text: 'Phone support' },
      { text: 'Priority updates & maintenance' },
      { text: '$400 referral bonus', bold: true },
    ],
    cta: 'Get Started',
    ctaHref: '#contact',
    highlighted: false,
  },
]

const onetimePlans: Plan[] = [
  {
    name: 'Essential',
    setupFee: '$799',
    setupNote: 'one-time payment',
    price: '$799',
    priceSuffix: '',
    priceNote: 'one-time · full ownership',
    description: 'Own your site outright. A clean, simple presence for businesses that want full control.',
    hostingCallout: 'Hosting & storage: $30/mo after launch',
    features: [
      { text: '5 pages included' },
      { text: 'Contact form' },
      { text: 'Mobile responsive design' },
      { text: 'Full ownership of your site', bold: true },
      { text: '30 days post-launch support' },
      { text: 'Maintenance billed at $80/hr' },
      { text: '$100 referral bonus', bold: true },
    ],
    cta: 'Get Started',
    ctaHref: '#contact',
    highlighted: false,
  },
  {
    name: 'Business',
    badge: 'Most Popular',
    setupFee: '$1,500',
    setupNote: 'one-time payment',
    price: '$1,500',
    priceSuffix: '',
    priceNote: 'one-time · full ownership',
    description: 'A complete owned website with a gallery and admin panel — built to last for years.',
    hostingCallout: 'Hosting & storage: $30/mo after launch',
    features: [
      { text: '7–10 pages included' },
      { text: 'Admin panel' },
      { text: 'Photo & project gallery' },
      { text: 'Full ownership of your site', bold: true },
      { text: '60 days post-launch support' },
      { text: 'Maintenance billed at $80/hr' },
      { text: '$250 referral bonus', bold: true },
    ],
    cta: 'Get Started',
    ctaHref: '#contact',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    setupFee: '$2,500+',
    setupNote: 'custom quote',
    price: '$2,500+',
    priceSuffix: '',
    priceNote: 'one-time · custom quote',
    description: 'Fully custom. We build exactly what your business needs — no templates, no compromises.',
    hostingCallout: 'Hosting & storage: $30/mo after launch',
    features: [
      { text: 'Custom features & integrations' },
      { text: 'Unlimited pages' },
      { text: 'Advanced functionality' },
      { text: 'Full ownership of your site', bold: true },
      { text: '90 days post-launch support' },
      { text: 'Maintenance billed at $80/hr' },
      { text: '$500 referral bonus', bold: true },
    ],
    cta: 'Contact Us',
    ctaHref: '#contact',
    highlighted: false,
  },
]

export default function Pricing() {
  const [tab, setTab] = useState<BillingTab>('monthly')
  const plans = tab === 'monthly' ? monthlyPlans : onetimePlans

  return (
    <section id="pricing" className="py-20 sm:py-24 lg:py-28 bg-white dark:bg-slate-950 px-4 sm:px-5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3 font-inter">Pricing</p>
          <h2 className="font-sora font-bold text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight leading-tight mb-5 text-balance">
            Simple, transparent pricing
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-inter max-w-xl mx-auto leading-relaxed mb-8">
            Choose a fully managed monthly plan with hosting included, or a one-time build you own outright. No hidden fees.
          </p>

          <div className="flex justify-center">
            <div className="glass-panel inline-flex rounded-xl p-1 gap-1 overflow-x-auto max-w-full">
            <button
              onClick={() => setTab('monthly')}
              className={`px-4 sm:px-6 py-2.5 rounded-lg text-sm font-semibold font-inter transition-all whitespace-nowrap min-h-[44px] ${
                tab === 'monthly'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              Monthly Managed
            </button>
            <button
              onClick={() => setTab('onetime')}
              className={`px-4 sm:px-6 py-2.5 rounded-lg text-sm font-semibold font-inter transition-all whitespace-nowrap min-h-[44px] ${
                tab === 'onetime'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              One-Time Build
            </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl flex flex-col transition-all duration-200 overflow-hidden ${
                plan.highlighted
                  ? 'bg-blue-600 text-white shadow-2xl shadow-blue-500/25 md:scale-[1.02]'
                  : 'glass-panel hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50'
              }`}
            >
              {plan.badge && (
                <div className={`absolute -top-px left-0 right-0 h-1 ${plan.highlighted ? 'bg-white/30' : 'bg-blue-600'}`} />
              )}

              <div className="p-6 sm:p-7">
                {plan.badge && (
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold font-inter mb-3 ${
                    plan.highlighted ? 'bg-white/20 text-white' : 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                  }`}>
                    {plan.badge}
                  </div>
                )}

                <p className={`font-sora font-bold text-xs uppercase tracking-widest mb-4 ${
                  plan.highlighted ? 'text-blue-200' : 'text-slate-400 dark:text-slate-500'
                }`}>
                  {plan.name}
                </p>

                {/* Price */}
                <div className="mb-2">
                  <span className={`font-sora font-bold text-5xl tracking-tight ${
                    plan.highlighted ? 'text-white' : 'text-slate-900 dark:text-white'
                  }`}>
                    {plan.price}
                  </span>
                  {plan.priceSuffix && (
                    <span className={`text-lg font-inter ml-1 ${
                      plan.highlighted ? 'text-blue-200' : 'text-slate-400 dark:text-slate-500'
                    }`}>
                      {plan.priceSuffix}
                    </span>
                  )}
                </div>

                {/* Price note */}
                <p className={`text-xs font-inter mb-3 ${
                  plan.highlighted ? 'text-blue-200' : 'text-slate-400 dark:text-slate-500'
                }`}>
                  {plan.priceNote}
                </p>

                {/* Setup fee — prominent */}
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold font-inter mb-5 ${
                  plan.highlighted
                    ? 'bg-white/15 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}>
                  <span className={`text-[10px] ${plan.highlighted ? 'text-blue-200' : 'text-slate-400 dark:text-slate-500'}`}>
                    {tab === 'monthly' ? 'SETUP FEE' : 'PRICE'}
                  </span>
                  <span>{plan.setupFee}</span>
                  <span className={`text-[10px] ${plan.highlighted ? 'text-blue-200' : 'text-slate-400 dark:text-slate-500'}`}>
                    · {plan.setupNote}
                  </span>
                </div>

                {/* Hosting callout for one-time */}
                {plan.hostingCallout && (
                  <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold font-inter mb-5 border ${
                    plan.highlighted
                      ? 'bg-white/10 border-white/20 text-white'
                      : 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400'
                  }`}>
                    <span className="text-base">🌐</span>
                    <span>{plan.hostingCallout}</span>
                  </div>
                )}

                <p className={`text-sm font-inter leading-relaxed mb-5 ${
                  plan.highlighted ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                }`}>
                  {plan.description}
                </p>

                <div className={`w-full h-px mb-5 ${plan.highlighted ? 'bg-blue-500' : 'bg-slate-100 dark:bg-slate-800'}`} />

                <ul className="flex flex-col gap-2.5 mb-7 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature.text} className="flex items-start gap-2.5">
                      <span className={`mt-0.5 text-xs font-bold shrink-0 ${
                        plan.highlighted ? 'text-blue-200' : 'text-blue-500 dark:text-blue-400'
                      }`}>✓</span>
                      <span className={`text-sm font-inter ${feature.bold ? 'font-semibold' : ''} ${
                        plan.highlighted ? 'text-blue-50' : 'text-slate-600 dark:text-slate-300'
                      }`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.ctaHref}
                  className={`w-full py-3.5 rounded-xl text-sm font-bold font-inter text-center block transition-all min-h-[44px] ${
                    plan.highlighted
                      ? 'bg-white text-blue-600 hover:bg-blue-50 shadow-lg shadow-blue-700/20'
                      : 'bg-blue-600 dark:bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-500 shadow-md shadow-blue-500/20'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-slate-400 dark:text-slate-500 font-inter mt-8">
          All prices are estimates. Final pricing may vary based on project scope.{' '}
          <Link href="#contact" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Get a free quote →
          </Link>
        </p>
      </div>
    </section>
  )
}
