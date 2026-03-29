'use client'

import { useState } from 'react'

export default function CTA() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit() {
    if (!name || !email) return
    setSubmitted(true)
  }

  return (
    <section id="contact" className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">

      {/* Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-indigo-400/10 blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h2 className="font-sora font-bold text-4xl sm:text-5xl text-white tracking-tight leading-tight mb-4">
          Ready to level up your<br className="hidden sm:block" /> web presence?
        </h2>
        <p className="text-lg text-blue-200 font-inter mb-10 leading-relaxed">
            Tell us a little about your business and we&apos;ll reach out to get you started. No contracts, no pressure.
        </p>

        {submitted ? (
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-8 py-10">
            <div className="text-4xl mb-3">✅</div>
              <p className="font-sora font-semibold text-white text-xl mb-1">We&apos;ll be in touch soon!</p>
            <p className="text-blue-200 font-inter text-sm">We typically respond within 1 business day.</p>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 min-w-0 bg-white/10 backdrop-blur-sm border border-white/25 rounded-xl px-4 py-3.5 text-white placeholder-blue-300/60 text-sm font-inter focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all"
            />
            <input
              type="email"
              placeholder="Business email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 min-w-0 bg-white/10 backdrop-blur-sm border border-white/25 rounded-xl px-4 py-3.5 text-white placeholder-blue-300/60 text-sm font-inter focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all"
            />
            <button
              onClick={handleSubmit}
              className="bg-white hover:bg-blue-50 text-blue-800 font-semibold text-sm px-6 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg whitespace-nowrap font-inter"
            >
              Get in touch →
            </button>
          </div>
        )}

        {!submitted && (
          <p className="text-xs text-blue-300/60 font-inter mt-4">
            We typically respond within 1 business day.
          </p>
        )}
      </div>
    </section>
  )
}
