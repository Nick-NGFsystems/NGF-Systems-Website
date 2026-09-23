'use client'

import { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import { isKnownIntent } from '@/lib/pricing'

type FormState = 'idle' | 'loading' | 'success' | 'error'

const FIELD =
  'w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 font-body text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-60 min-h-[44px]'

const LABEL = 'font-body text-sm font-medium text-slate-700 dark:text-slate-300'

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
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center">
        <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
          <Icon name="check" className="h-5 w-5" />
        </div>
        <p className="font-sora font-semibold text-lg text-slate-900 dark:text-white">
          Thanks — that came through.
        </p>
        <p className="mt-2 font-body text-sm text-slate-600 dark:text-slate-400">
          We reply within one business day, usually sooner.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8"
      noValidate
    >
      {intent && (
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/50 px-4 py-3">
          <span className="font-body text-sm font-medium text-blue-800 dark:text-blue-300">
            Enquiring about: {intent}
          </span>
          <button
            type="button"
            onClick={() => setIntent('')}
            className="ml-auto font-body text-xs text-blue-600/70 dark:text-blue-400/70 hover:text-blue-800 dark:hover:text-blue-300"
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
          className="mt-5 rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 px-4 py-3 font-body text-sm text-red-700 dark:text-red-400"
        >
          {errorMsg}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={state === 'loading'}>
          {state === 'loading' ? 'Sending…' : 'Send enquiry'}
        </Button>
        <p className="font-body text-xs text-slate-500 dark:text-slate-500">
          No obligation. We reply within one business day.
        </p>
      </div>
    </form>
  )
}
