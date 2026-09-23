'use client'

import { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import { isKnownIntent } from '@/lib/pricing'

type FormState = 'idle' | 'loading' | 'success' | 'error'

const FIELD =
  'w-full min-h-[44px] rounded-lg border border-line bg-ink px-3.5 py-2.5 text-[15px] text-white placeholder:text-dim focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-60'

const LABEL = 'text-[14.5px] font-medium text-white/85'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [business, setBusiness] = useState('')
  const [intent, setIntent] = useState('')
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  // The intent arrives as `?intent=`. It is validated against the fixed list
  // in lib/pricing.ts — an unrecognised value is dropped rather than shown,
  // so a crafted link cannot put arbitrary text above NGF's own form.
  useEffect(() => {
    const read = () => {
      const raw = new URLSearchParams(window.location.search).get('intent')
      setIntent(isKnownIntent(raw) ? raw : '')
    }
    read()
    window.addEventListener('popstate', read)
    return () => window.removeEventListener('popstate', read)
  }, [])

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!name.trim() || !email.trim()) {
      setErrorMsg('Please enter your name and email.')
      setState('error')
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
        setErrorMsg('Something went wrong. Please try again, or email nick@ngfsystems.com directly.')
        setState('error')
      }
    } catch {
      setErrorMsg('Something went wrong. Please try again, or email nick@ngfsystems.com directly.')
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="rounded-xl border border-line bg-panel p-8 text-center">
        <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-accent/20 text-accent-light">
          <Icon name="check" className="h-5 w-5" />
        </div>
        <p className="text-[18px] font-semibold text-white">Thanks — that came through.</p>
        <p className="mt-2 text-[15px] text-muted">
          We reply within one business day, usually sooner.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-line bg-panel p-6 sm:p-8"
      noValidate
    >
      {intent && (
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-accent/40 bg-accent/10 px-4 py-3">
          <span className="text-[14.5px] font-medium text-accent-light">
            Enquiring about: {intent}
          </span>
          <button
            type="button"
            onClick={() => setIntent('')}
            className="ml-auto text-[13px] text-muted transition-colors hover:text-white"
          >
            Clear
          </button>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-name" className={LABEL}>
            Your name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={state === 'loading'}
            className={FIELD}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-email" className={LABEL}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={state === 'loading'}
            className={FIELD}
          />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-1.5">
        <label htmlFor="contact-business" className={LABEL}>
          What does your business do, and what do you need?
        </label>
        <textarea
          id="contact-business"
          name="business"
          rows={4}
          value={business}
          onChange={(e) => setBusiness(e.target.value)}
          disabled={state === 'loading'}
          placeholder="We run a detailing shop in Grandville. We need a new site and we want customers to book themselves."
          className={`${FIELD} resize-y`}
        />
      </div>

      {errorMsg && (
        <p
          role="alert"
          className="mt-5 rounded-lg border border-red-900/60 bg-red-950/40 px-4 py-3 text-[14.5px] text-red-300"
        >
          {errorMsg}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={state === 'loading'}>
          {state === 'loading' ? 'Sending…' : 'Send enquiry'}
        </Button>
        <p className="text-[13px] text-dim">No obligation. We reply within one business day.</p>
      </div>
    </form>
  )
}
