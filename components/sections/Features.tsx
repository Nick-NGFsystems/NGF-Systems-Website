interface Feature {
  icon: string
  title: string
  description: string
  tag?: string
}

const features: Feature[] = [
  {
    icon: '🖥️',
    title: 'Custom Website Builds',
    description: 'Beautiful, fast websites built specifically for your business — mobile-first, conversion-focused, and ready to impress.',
    tag: 'Core',
  },
  {
    icon: '🔄',
    title: 'Ongoing Management',
    description: 'Submit change requests any time through your client portal. We handle updates so you never have to touch the code.',
    tag: 'Core',
  },
  {
    icon: '🏠',
    title: 'Realtor Integrations',
    description: 'MLS and RealScout integration built-in. Active listings, search, and lead capture — synced automatically.',
    tag: 'Realtor',
  },
  {
    icon: '📊',
    title: 'Client Dashboard',
    description: 'A clean portal to view your site status, submit requests, track changes, and communicate with our team.',
    tag: 'Included',
  },
  {
    icon: '🔒',
    title: 'Hosting & Security',
    description: 'Enterprise-grade hosting with SSL, backups, and 99.9% uptime. Your site is fast, secure, and always on.',
    tag: 'Included',
  },
  {
    icon: '📍',
    title: 'Local Michigan Team',
    description: 'We work directly with Michigan businesses. Real people, real support — no outsourcing, no chatbots.',
    tag: 'Local',
  },
]

const tagColors: Record<string, string> = {
  Core: 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900',
  Realtor: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900',
  Included: 'bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 border-violet-100 dark:border-violet-900',
  Local: 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900',
}

export default function Features() {
  return (
    <section id="features" className="py-28 bg-slate-50/50 dark:bg-slate-900/50 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3 font-inter">What we do</p>
          <h2 className="font-sora font-bold text-4xl sm:text-5xl text-slate-900 dark:text-white tracking-tight leading-tight mb-5">
            Everything your website needs,<br className="hidden sm:block" /> handled for you
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-inter max-w-xl mx-auto leading-relaxed">
            Built for small businesses and realtors who want a professional online presence without dealing with the tech.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 hover:border-blue-100 dark:hover:border-blue-900 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-xl group-hover:bg-blue-50 dark:group-hover:bg-blue-950/50 group-hover:border-blue-100 dark:group-hover:border-blue-900 transition-colors">
                  {feature.icon}
                </div>
                {feature.tag && (
                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border font-inter ${tagColors[feature.tag]}`}>
                    {feature.tag}
                  </span>
                )}
              </div>
              <h3 className="font-sora font-semibold text-base text-slate-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-inter leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
