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
    description: 'You get a fast, beautiful website built around your business — not a generic template. Mobile-first, easy to navigate, and designed to turn visitors into customers.',
    tag: 'Core',
  },
  {
    icon: '🔄',
    title: 'Easy Change Requests',
    description: 'Need to update your hours, swap a photo, or add a new page? Just submit a request through your portal. We handle it — usually within 48 hours.',
    tag: 'Core',
  },
  {
    icon: '🚀',
    title: 'Launch-Ready in Days',
    description: 'No waiting months for your site to go live. We move fast — from first mockup to launch, most projects are live within 1–2 weeks.',
    tag: 'Core',
  },
  {
    icon: '🏠',
    title: 'Built for Realtors',
    description: 'MLS and RealScout integration built-in. Your active listings, search tools, and lead capture forms stay synced automatically — no manual updates needed.',
    tag: 'Realtor',
  },
  {
    icon: '💰',
    title: 'Flexible Pricing',
    description: 'Choose a monthly managed plan with everything included, or pay once and own your site outright. Either way, pricing is transparent with no surprise fees.',
    tag: 'Pricing',
  },
  {
    icon: '📍',
    title: 'Real Local Support',
    description: 'We are a Michigan-based team working directly with Michigan businesses. When you reach out, you talk to a real person — not a chatbot or overseas help desk.',
    tag: 'Local',
  },
]

const tagColors: Record<string, string> = {
  Core: 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900',
  Realtor: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900',
  Pricing: 'bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 border-violet-100 dark:border-violet-900',
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
            Built for small businesses and realtors who want a professional online presence — without dealing with the tech.
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
