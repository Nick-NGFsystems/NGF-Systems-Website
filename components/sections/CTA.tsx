'use client'

import { useState, useEffect } from 'react'

type FormState = 'idle' | 'loading' | 'success' | 'error'

const intentLabels: Record<string, string> = {
  'Free Mockup Request': '🎨 Free Mockup Request',
  'Free Quote Request': '💬 Free Quote Request',
  'Starter — Monthly Managed': '📦 Starter Plan — Monthly Managed',
  'Professional — Monthly Managed': '⭐ Professional Plan — Monthly Managed',
  'Premium — Monthly Managed': '🚀 Premium Plan — Monthly Managed',
  'Essential — One-Time Build': '📦 Essential Build — One-Time',
  'Business — One-Time Build': '⭐ Business Build — One-Time',
  'Enterprise — One-Time Build': '🏢 Enterprise Build — One-Time',
}

export default function CTA({ ngf }: { ngf?: NgfSiteContent }) {
  const ctaHeadline = ngf?.cta?.headline || '{ctaHeadline}'
  const ctaSubheadline = ngf?.cta?.subheadline || '{ctaSubheadline}'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [business, setBusiness] = useState('')
  const [intent, setIntent] = useState('')
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const readIntent = () => {
      const searchParams = new URLSearchParams(window.location.search)
      const rawFromSearch = searchParams.get('intent')
      if (rawFromSearch) {
        setIntent(rawFromSearch)
        return
      }

      // Backward compatibility with previous hash query format: #contact?intent=...
      const hash = window.location.hash
      const queryStart = hash.indexOf('?')
      if (queryStart !== -1) {
        const hashParams = new URLSearchParams(hash.slice(queryStart + 1))
        const rawFromHash = hashParams.get('intent')
        if (rawFromHash) {
          setIntent(decodeURIComponent(rawFromHash))
          return
        }
      }

      setIntent('')
    }

    const onLocationChange = () => readIntent()
    const originalPushState = window.history.pushState
    const originalReplaceState = window.history.replaceState

    window.history.pushState = function (...args) {
      originalPushState.apply(this, args)
      onLocationChange()
    }

    window.history.replaceState = function (...args) {
      originalReplaceState.apply(this, args)
      onLocationChange()
    }

    readIntent()
    window.addEventListener('hashchange', onLocationChange)
    window.addEventListener('popstate', onLocationChange)

    return () => {
      window.history.pushState = originalPushState
      window.history.replaceState = originalReplaceState
      window.removeEventListener('hashchange', onLocationChange)
      window.removeEventListener('popstate', onLocationChange)
    }
  }, [])

  async function handleSubmit() {
    if (!name || !email) {
      setErrorMsg('Please enter your name and email.')
      return
    }
    setState('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, business, intent }),
      })
      const data = await res.json()

      if (data.success) {
        setState('success')
      } else {
        setErrorMsg('Something went wrong. Please try again or email us directly.')
        setState('error')
      }
    } catch {
      setErrorMsg('Something went wrong. Please try again or email us directly.')
      setState('error')
    }
  }

  const intentDisplay = intentLabels[intent] || (intent ? `📋 ${intent}` : '')

  return (
    <section id="contact" className="relative py-24 px-5 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 dark:from-slate-950 dark:via-blue-950/50 dark:to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3 font-inter">Get in touch</p>
          <h2 data-ngf-field="cta.headline" className="font-sora font-bold text-4xl sm:text-5xl text-white tracking-tight leading-tight mb-4">
            {ctaHeadline}
          </h2>
          <p data-ngf-field="cta.subheadline" className="text-lg text-slate-400 font-inter leading-relaxed">
            {ctaSubheadline}
          </p>
        </div>

        {state === 'success' ? (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-8 py-12 text-center">
            <div className="w-14 h-14 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">✅</div>
            <p className="font-sora font-bold text-white text-xl mb-2">We will be in touch soon!</p>
            <p className="text-slate-400 font-inter text-sm">We typically respond within 1 business day.</p>
          </div>
        ) : (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-7 sm:p-8 flex flex-col gap-4">

            {/* Intent tag */}
            {intentDisplay && (
              <div className="flex items-center gap-2 bg-blue-500/15 border border-blue-400/25 rounded-xl px-4 py-3">
                <span className="text-sm font-semibold text-blue-300 font-inter">{intentDisplay}</span>
                <button
                  onClick={() => setIntent('')}
                  className="ml-auto text-blue-400/60 hover:text-blue-300 text-xs font-inter transition-colors"
                  aria-label="Clear selection"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-400 font-inter">Your name</label>
                <input
                  type="text"
                  placeholder="Nick"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={state === 'loading'}
                  className="bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm font-inter focus:outline-none focus:border-blue-500/50 transition-all min-h-[44px] disabled:opacity-50"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-400 font-inter">Business email</label>
                <input
                  type="email"
                  placeholder="nick@yourbusiness.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={state === 'loading'}
                  className="bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm font-inter focus:outline-none focus:border-blue-500/50 transition-all min-h-[44px] disabled:opacity-50"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400 font-inter">Tell us about your business</label>
              <textarea
                placeholder="We are a local realtor in West Michigan looking for a new website..."
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
                disabled={state === 'loading'}
                rows={3}
                className="bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm font-inter focus:outline-none focus:border-blue-500/50 transition-all resize-none disabled:opacity-50"
              />
            </div>

            {errorMsg && (
              <p className="text-sm text-red-400 font-inter bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                {errorMsg}
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={state === 'loading'}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm px-6 py-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/25 font-inter min-h-[44px]"
            >
              {state === 'loading' ? 'Sending...' : 'Send Message →'}
            </button>
            <p className="text-xs text-slate-500 font-inter text-center">
              We typically respond within 1 business day.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
