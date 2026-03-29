import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center text-center px-4 sm:px-5 pt-28 sm:pt-24 pb-16 sm:pb-20 overflow-hidden bg-white dark:bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white dark:from-blue-950/30 dark:via-slate-950 dark:to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-50/60 via-transparent to-transparent dark:from-indigo-950/20 dark:via-transparent dark:to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.07)_1px,transparent_1px)] bg-[size:48px_48px] dark:bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900 shadow-sm shadow-blue-100/50 dark:shadow-blue-900/20 rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 font-inter tracking-wide">Michigan-based · Web Management Platform</span>
        </div>

        <h1 className="font-sora font-bold text-4xl sm:text-6xl lg:text-[72px] tracking-tight text-slate-900 dark:text-white leading-[1.08] mb-6 text-balance">
          Your website,{' '}
          <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
            finally handled.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-slate-500 dark:text-slate-400 font-inter leading-relaxed max-w-2xl mx-auto mb-10">
          NGFsystems builds and manages websites for small businesses and realtors across Michigan. We handle everything — so you can focus on running your business.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12 sm:mb-16 w-full max-w-md sm:max-w-none mx-auto">
          <Link
            href="#pricing"
            className="group w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base px-8 py-4 rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5 font-inter min-h-[44px] flex items-center justify-center"
          >
            See Pricing
            <span className="inline-block ml-2 group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
          <Link
            href="#contact"
            className="glass-panel w-full sm:w-auto hover:bg-slate-50/80 dark:hover:bg-slate-800/70 text-slate-700 dark:text-slate-200 font-semibold text-base px-8 py-4 rounded-xl hover:border-slate-300 dark:hover:border-slate-600 transition-all font-inter shadow-sm min-h-[44px] flex items-center justify-center"
          >
            Get a Free Quote
          </Link>
        </div>

        <div className="glass-panel inline-grid grid-cols-2 sm:inline-flex sm:flex-wrap items-center justify-center gap-4 sm:gap-6 rounded-2xl px-5 sm:px-8 py-4 sm:py-5 shadow-sm w-full max-w-[560px]">
          {[
            { icon: '📍', label: 'Michigan-based' },
            { icon: '📋', label: 'No contracts' },
            { icon: '💬', label: 'Free quote' },
            { icon: '🤝', label: 'Local support' },
          ].map((item, i, arr) => (
            <div key={item.label} className="flex items-center gap-4 sm:gap-6 justify-center">
              <div className="flex items-center gap-2">
                <span className="text-base">{item.icon}</span>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 font-inter">{item.label}</span>
              </div>
              {i < arr.length - 1 && <div className="hidden sm:block w-px h-5 bg-slate-200 dark:bg-slate-700" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
