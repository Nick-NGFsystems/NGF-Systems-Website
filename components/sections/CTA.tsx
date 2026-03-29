'use client'

import { useState } from 'react'

export default function CTA() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [business, setBusiness] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit() {
    if (!name || !email) return
    setSubmitted(true)
  }

  return (
    <section id="contact" className="relative py-24 px-5 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3 font-inter">Get in touch</p>
          <h2 className="font-sora font-bold text-4xl sm:text-5xl text-white tracking-tight leading-tight mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg text-slate-400 font-inter leading-relaxed">
            Tell us about your business and we will reach out with a free quote. No pressure, no commitment.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-8 py-12 text-center">
            <div className="w-14 h-14 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">✅</div>
            <p className="font-sora font-bold text-white text-xl mb-2">We will be in touch soon!</p>
            <p className="text-slate-400 font-inter text-sm">We typically respond within 1 business day.</p>
          </div>
        ) : (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-7 sm:p-8 flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-400 font-inter">Your name</label>
                <input
                  type="text"
                  placeholder="Nick"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm font-inter focus:outline-none focus:border-blue-500/50 focus:bg-white/12 transition-all min-h-[44px]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-400 font-inter">Business email</label>
                <input
                  type="email"
                  placeholder="nick@yourbusiness.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm font-inter focus:outline-none focus:border-blue-500/50 focus:bg-white/12 transition-all min-h-[44px]"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400 font-inter">Tell us about your business</label>
              <textarea
                placeholder="We are a local realtor in West Michigan looking for a new website..."
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
                rows={3}
                className="bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm font-inter focus:outline-none focus:border-blue-500/50 focus:bg-white/12 transition-all resize-none"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 py-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/25 font-inter min-h-[44px]"
            >
              Send Message →
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
