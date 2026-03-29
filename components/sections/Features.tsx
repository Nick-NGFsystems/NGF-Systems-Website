interface Feature {
  icon: string
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: '🖥️',
    title: 'Custom Website Builds',
    description: 'We design and develop fast, beautiful websites tailored to your business — mobile-first and built to convert visitors into customers.',
  },
  {
    icon: '🔄',
    title: 'Ongoing Management',
    description: 'Submit change requests anytime through your dashboard. We handle updates, content changes, and technical maintenance so you don\'t have to.',
  },
  {
    icon: '🏠',
    title: 'Realtor Integrations',
    description: 'MLS and RealScout integration built-in. Showcase active listings, search, and lead capture — all synced automatically to your site.',
  },
  {
    icon: '📊',
    title: 'Client Dashboard',
    description: 'A clean, intuitive portal to view your site status, submit requests, track progress, and communicate with our team in real time.',
  },
  {
    icon: '🔒',
    title: 'Hosting & Security',
    description: 'Enterprise-grade hosting on Vercel with SSL, backups, and 99.9% uptime. Your site is fast, secure, and always available.',
  },
  {
    icon: '📍',
    title: 'Local Michigan Team',
    description: 'We\'re based in Michigan and work with local businesses directly. Real people, real support — no overseas outsourcing or chatbots.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white px-4">
      <div className="max-w-6xl mx-auto">

        <p className="text-center text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3 font-inter">
          What we do
        </p>
        <h2 className="font-sora font-bold text-4xl sm:text-5xl text-slate-900 text-center tracking-tight leading-tight mb-4">
          Everything your business<br className="hidden sm:block" /> website needs in one place
        </h2>
        <p className="text-center text-lg text-slate-500 font-inter max-w-xl mx-auto mb-14 leading-relaxed">
          Built for small businesses, realtors, and local service companies who want a professional online presence without the tech headache.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative bg-gradient-to-br from-white to-slate-50/80 border border-slate-100 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/8 transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-600/8 border border-blue-600/12 flex items-center justify-center text-2xl mb-4">
                {feature.icon}
              </div>
              <h3 className="font-sora font-semibold text-lg text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-500 font-inter leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
