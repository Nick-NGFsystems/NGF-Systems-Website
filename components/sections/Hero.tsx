import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-5 pt-24 pb-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-50/60 via-transparent to-transparent" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.07)_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white border border-blue-100 shadow-sm shadow-blue-100/50 rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-xs font-semibold text-blue-600 font-inter tracking-wide">Michigan-based · Web Management Platform</span>
        </div>

        {/* Heading */}
        <h1 className="font-sora font-bold text-5xl sm:text-6xl lg:text-[72px] tracking-tight text-slate-900 leading-[1.08] mb-6">
          Your website,{' '}
          <span className="relative">
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
              finally handled.
            </span>
          </span>
        </h1>

        {/* Sub */}
        <p className="text-lg sm:text-xl text-slate-500 font-inter leading-relaxed max-w-2xl mx-auto mb-10">
          NGFsystems builds and manages websites for small businesses and realtors across Michigan. We handle everything — so you can focus on running your business.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
          <Link
            href="#pricing"
            className="group bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base px-8 py-4 rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5 font-inter"
          >
            See Pricing
            <span className="inline-block ml-2 group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
          <Link
            href="#contact"
            className="bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base px-8 py-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all font-inter shadow-sm"
          >
            Get a Free Quote
          </Link>
        </div>

        {/* Stats row */}
        <div className="inline-flex flex-wrap items-center justify-center gap-8 bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-2xl px-8 py-5 shadow-sm">
          {[
            { num: '100%', label: 'Uptime SLA' },
            { num: '48hr', label: 'Avg. turnaround' },
            { num: '$100+', label: 'Referral bonus' },
            { num: 'MI', label: 'Local team' },
          ].map((stat, i, arr) => (
            <div key={stat.label} className="flex items-center gap-8">
              <div className="text-center">
                <div className="font-sora font-bold text-xl text-slate-900">{stat.num}</div>
                <div className="text-xs text-slate-400 font-inter mt-0.5">{stat.label}</div>
              </div>
              {i < arr.length - 1 && <div className="hidden sm:block w-px h-8 bg-slate-200" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
