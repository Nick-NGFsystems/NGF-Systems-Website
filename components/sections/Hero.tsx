import Link from 'next/link'
import type { NgfHero } from '@/lib/ngf'

interface HeroProps {
  content?: NgfHero
}

export default function Hero({ content }: HeroProps) {
  const headline = content?.headline || 'We build websites that work.'
  const subheadline = content?.subheadline || 'NGF Systems builds and manages websites for small businesses and realtors across Michigan. We handle everything — so you can focus on running your business.'
  const ctaText = content?.ctaText || 'Get a Free Mockup'
  const ctaLink = content?.ctaLink || '/?intent=Free+Mockup+Request#contact'

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-5 pt-24 pb-20 overflow-hidden bg-white dark:bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white dark:from-blue-950/30 dark:via-slate-950 dark:to-slate-950"/>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-50/60 via-transparent to-transparent dark:from-indigo-950/20 dark:via-transparent dark:to-transparent"/>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.07)_1px,transparent_1px)] bg-[size:48px_48px] dark:bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)]"/>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"/>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900 shadow-sm shadow-blue-100/50 dark:shadow-blue-900/20 rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"/>
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 font-inter tracking-wide">Michigan-based · Web Management Platform</span>
        </div>

        <h1 className="font-sora font-bold text-5xl sm:text-6xl lg:text-[72px] tracking-tight text-slate-900 dark:text-white leading-[1.08] mb-6">
          {headline}
        </h1>

        <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 font-inter leading-relaxed max-w-2xl mx-auto mb-10">
          {subheadline}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
          <Link
            href="#pricing"
            className="group bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base px-8 py-4 rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5 font-inter"
          >
            See Pricing
          </Link>
          <Link
            href={ctaLink}
            className="group bg-white dark:bg-slate-900 border border-slate-900/10 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-base px-8 py-4 rounded-xl transition-all shadow-sm dark:shadow-none dark:hover:border-slate-600 font-inter"
          >
            {ctaText}
            <span className="inline-block ml-2 group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
