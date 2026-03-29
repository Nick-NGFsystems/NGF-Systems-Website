'use client'

import { useState } from 'react'
import Link from 'next/link'

type BillingTab = 'monthly' | 'onetime'

interface PlanFeature {
  text: string
}

interface Plan {
  name: string
  badge?: string
  setupLabel: string
  setupPrice: string
  priceLabel: string
  price: string
  priceSuffix?: string
  description: string
  features: PlanFeature[]
  referral: string
  cta: string
  ctaHref: string
  highlighted: boolean
}

const monthlyPlans: Plan[] = [
  {
    name: 'Starter',
    setupLabel: 'Setup fee',
    setupPrice: '$150',
    priceLabel: 'per month',
    price: '$100',
    priceSuffix: '/mo',
    description: 'A complete website for local businesses ready to get online and look professional.',
    features: [
      { text: '5 pages included' },
      { text: 'Mobile responsive design' },
      { text: 'Contact form with email notifications' },
      { text: 'Basic SEO setup' },
      { text: 'Hosting & SSL certificate' },
      { text: 'Monthly updates included' },
      { text: 'Email support' },
      { text: '$100 referral bonus' },
    ],
    referral: '$100 referral bonus',
    cta: 'Get Started',
    ctaHref: '#contact',
    highlighted: false,
  },
  {
    name: 'Professional',
    badge: 'Most Popular',
    setupLabel: 'Setup fee',
    setupPrice: '$300',
    priceLabel: 'per month',
    price: '$250',
    priceSuffix: '/mo',
    description: 'For growing businesses that need more pages, a gallery, and hands-on monthly support.',
    features: [
      { text: '7–10 pages included' },
      { text: 'Admin panel' },
      { text: 'Photo & project gallery with upload' },
      { text: 'Google Analytics integration' },
      { text: 'Social media integration' },
      { text: '2 hours/month changes included' },
      { text: 'Priority email support' },
      { text: '$250 referral bonus' },
    ],
    referral: '$250 referral bonus',
    cta: 'Get Started',
    ctaHref: '#contact',
    highlighted: true,
  },
  {
    name: 'Premium',
    setupLabel: 'Setup fee',
    setupPrice: '$600',
    priceLabel: 'per month',
    price: '$400',
    priceSuffix: '/mo',
    description: 'The full package — bookings, payments, portals, and a dedicated team behind your site.',
    features: [
      { text: 'Unlimited pages' },
      { text: 'Advanced features (booking, payments)' },
      { text: 'Custom integrations (CRM, scheduling)' },
      { text: 'Customer portals' },
      { text: 'Monthly performance reports' },
      { text: '5 hours/month changes included' },
      { text: 'Phone support' },
      { text: 'Priority updates & maintenance' },
      { text: '$400 referral bonus' },
    ],
    referral: '$400 referral bonus',
    cta: 'Get Started',
    ctaHref: '#contact',
    highlighted: false,
  },
]

const onetimePlans: Plan[] = [
  {
    name: 'Essential',
    setupLabel: 'One-time',
    setupPrice: '',
    priceLabel: 'one-time',
    price: '$799',
    description: 'Own your site outright. A clean, simple presence for businesses that want full ownership.',
    features: [
      { text: '5 pages included' },
      { text: 'Contact form' },
      { text: 'Mobile responsive design' },
      { text: 'Full ownership of your site' },
      { text: '30 days support after launch' },
      { text: 'Hosting available: $30/mo' },
      { text: 'Maintenance: $80/hr after support period' },
      { text: '$100 referral bonus' },
    ],
    referral: '$100 referral bonus',
    cta: 'Get Started',
    ctaHref: '#contact',
    highlighted: false,
  },
  {
    name: 'Business',
    badge: 'Most Popular',
    setupLabel: 'One-time',
    setupPrice: '',
    priceLabel: 'one-time',
    price: '$1,500',
    description: 'A complete owned website with a gallery and admin panel — built to last for years.',
    features: [
      { text: '7–10 pages included' },
      { text: 'Admin panel' },
      { text: 'Photo & project gallery' },
      { text: 'Full ownership of your site' },
      { text: '60 days support after launch' },
      { text: 'Hosting available: $30/mo' },
      { text: 'Maintenance: $80/hr after support period' },
      { text: '$250 referral bonus' },
    ],
    referral: '$250 referral bonus',
    cta: 'Get Started',
    ctaHref: '#contact',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    setupLabel: 'Starting at',
    setupPrice: '',
    priceLabel: 'one-time',
    price: '$5,000+',
    description: 'Fully custom. We build exactly what your business needs — no templates, no compromises.',
    features: [
      { text: 'Custom features & integrations' },
      { text: 'Unlimited pages' },
      { text: 'Advanced functionality' },
      { text: 'Full ownership of your site' },
      { text: '90 days support after launch' },
      { text: 'Hosting available: $30/mo' },
      { text: 'Maintenance: $80/hr after support period' },
      { text: '$500 referral bonus' },
    ],
    referral: '$500 referral bonus',
    cta: 'Contact Us',
    ctaHref: '#contact',
    highlighted: false,
  },
]

export default function Pricing() {
  const [tab, setTab] = useState<BillingTab>('monthly')
  const plans = tab === 'monthly' ? monthlyPlans : onetimePlans

  return (
    <section id="pricing" className="py-28 bg-white px-5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3 font-inter">Pricing</p>
          <h2 className="font-sora font-bold text-4xl sm:text-5xl text-slate-900 tracking-tight leading-tight mb-5">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-slate-500 font-inter max-w-xl mx-auto leading-relaxed mb-8">
            Choose between a fully managed monthly plan or a one-time build you own outright. No hidden fees.
          </p>

          {/* Tab toggle */}
          <div className="inline-flex bg-slate-100 rounded-xl p-1 gap-1">
            <button
              onClick={() => setTab('monthly')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold font-inter transition-all ${
                tab === 'monthly'
                  ? 'bg-white text-slate-900 shadow-sm shadow-slate-200/80'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Monthly Managed
            </button>
            <button
              onClick={() => setTab('onetime')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold font-inter transition-all ${
                tab === 'onetime'
                  ? 'bg-white text-slate-900 shadow-sm shadow-slate-200/80'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              One-Time Build
            </button>
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-7 flex flex-col transition-all duration-200 ${
                plan.highlighted
                  ? 'bg-blue-600 text-white shadow-2xl shadow-blue-500/25 scale-[1.02]'
                  : 'bg-white border border-slate-100 hover:border-slate-200 hover:shadow-lg hover:shadow-slate-200/50'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold font-inter whitespace-nowrap ${
                  plan.highlighted ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'
                }`}>
                  {plan.badge}
                </div>
              )}

              {/* Plan name */}
              <p className={`font-sora font-bold text-xs uppercase tracking-widest mb-3 ${plan.highlighted ? 'text-blue-200' : 'text-slate-400'}`}>
                {plan.name}
              </p>

              {/* Price */}
              <div className="mb-1">
                <span className={`font-sora font-bold text-5xl tracking-tight ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                  {plan.price}
                </span>
                {plan.priceSuffix && (
                  <span className={`text-lg font-inter ml-1 ${plan.highlighted ? 'text-blue-200' : 'text-slate-400'}`}>
                    {plan.priceSuffix}
                  </span>
                )}
              </div>

              {/* Setup fee */}
              {tab === 'monthly' && (
                <p className={`text-xs font-inter mb-4 ${plan.highlighted ? 'text-blue-200' : 'text-slate-400'}`}>
                  {plan.setupPrice} setup fee · replaces first month
                </p>
              )}
              {tab === 'onetime' && (
                <p className={`text-xs font-inter mb-4 ${plan.highlighted ? 'text-blue-200' : 'text-slate-400'}`}>
                  one-time payment · full ownership
                </p>
              )}

              {/* Description */}
              <p className={`text-sm font-inter leading-relaxed mb-6 ${plan.highlighted ? 'text-blue-100' : 'text-slate-500'}`}>
                {plan.description}
              </p>

              {/* Divider */}
              <div className={`w-full h-px mb-6 ${plan.highlighted ? 'bg-blue-500' : 'bg-slate-100'}`} />

              {/* Features */}
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-2.5">
                    <span className={`mt-0.5 text-xs font-bold shrink-0 ${plan.highlighted ? 'text-blue-200' : 'text-blue-500'}`}>✓</span>
                    <span className={`text-sm font-inter ${feature.text.includes('referral') ? 'font-semibold' : ''} ${plan.highlighted ? 'text-blue-50' : 'text-slate-600'}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={plan.ctaHref}
                className={`w-full py-3.5 rounded-xl text-sm font-bold font-inter text-center transition-all ${
                  plan.highlighted
                    ? 'bg-white text-blue-600 hover:bg-blue-50 shadow-lg shadow-blue-700/20'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-sm text-slate-400 font-inter mt-8">
          All prices are estimates. Final pricing may vary based on project scope.{' '}
          <Link href="#contact" className="text-blue-600 hover:underline font-medium">
            Get a free quote →
          </Link>
        </p>
      </div>
    </section>
  )
}
