import type { NgfService } from '@/lib/ngf'

interface Feature {
  icon: string
  title: string
  description: string
  tag?: string
}

const defaultFeatures: Feature[] = [
  { icon: '🎨', title: 'Custom Website Builds', description: 'You get a fast, beautiful website built around your business — not a generic template. Mobile-first, easy to navigate, and designed to turn visitors into customers.', tag: 'Core' },
  { icon: '🚀', title: 'Easy Change Requests', description: 'Need to update your hours, swap a photo, or add a new page? Just submit a request through our portal. We handle it, usually within 48 hours.', tag: 'Core' },
  { icon: '📊', title: 'SEO Built In', description: 'Your website is built from the ground up to rank on Google. We handle everything — meta tags, site speed, mobile optimization, and structured data.', tag: 'Core' },
  { icon: '📧', title: 'Lead Capture Forms', description: 'Capture visitor info with custom forms. Get inquiries sent directly to your email or pull them through Zapier to your favorite tools.', tag: 'Core' },
  { icon: '🌐', title: 'Domain & Hosting', description: 'Your domain and hosting are included. We handle renewals, SSL certificates, and backups so you never have to think about it.', tag: 'Core' },
  { icon: '🎯', title: 'Analytics & Insights', description: 'See who visits your site, where they come from, and what they do. Understand your visitors with easy-to-read reports.', tag: 'Premium' },
  { icon: '🔒', title: 'Security & Backups', description: 'Daily backups, DDoS protection, malware scanning, and security updates. Your website is protected 24/7.', tag: 'Premium' },
  { icon: '⚡', title: 'Lightning Fast', description: 'Optimized for speed. We cache assets, compress images, use a CDN, and optimize code so your site loads in under 2 seconds.', tag: 'Premium' },
  { icon: '🎬', title: 'Video Hosting', description: 'Host your videos directly on your website. No buffering, no ads, no sending people to YouTube.', tag: 'Premium' },
]

interface FeaturesProps {
  services?: NgfService[]
}

export default function Features({ services }: FeaturesProps) {
  const features: Feature[] = services && services.length > 0
    ? services.map((s) => ({ icon: '✦', title: s.title, description: s.description }))
    : defaultFeatures

  return (
    <section id="features" className="py-24 bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 data-ngf-field="features.title" className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl mb-4">
            Everything You Need
          </h2>
          <p data-ngf-field="features.subtitle" className="text-lg text-slate-600 dark:text-slate-400">
            Built-in features that would cost thousands in separate tools.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700 text-xl hover:shadow-lg hover:shadow-blue-500/20 transition-colors">
                  {feature.icon}
                </div>
              </div>
              <div className="flex-1">
                <h3 data-ngf-field={`feature${features.indexOf(feature)}.title`} className="font-sora font-semibold text-base text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p data-ngf-field={`feature${features.indexOf(feature)}.description`} className="text-sm text-slate-500 dark:text-slate-400 font-inter leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
