import type { Metadata } from 'next'
import PageHeader from '@/components/ui/PageHeader'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import FeatureItem from '@/components/ui/FeatureItem'
import Card from '@/components/ui/Card'
import Icon, { type IconName } from '@/components/ui/Icon'
import Button from '@/components/ui/Button'
import CallToAction from '@/components/sections/CallToAction'
import { MODULES, contactHref } from '@/lib/pricing'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'What NGF Systems builds and manages: custom website design, hosting and security, a client portal you run yourself, online booking, online stores, and custom integrations.',
  alternates: { canonical: '/services' },
}

/** The base, stated as capabilities rather than marketing lines. */
const CORE: { icon: IconName; title: string; body: string }[] = [
  {
    icon: 'layout',
    title: 'Design and build',
    body: 'A site built from scratch around how your business sells. No themes, no page builder, no template someone else is also using in the next town.',
  },
  {
    icon: 'search',
    title: 'Search and analytics',
    body: 'Page titles, descriptions, structured data, a sitemap and genuinely fast load times, done at build time. Google Analytics wired up so you can see who arrives and from where.',
  },
  {
    icon: 'shield',
    title: 'Hosting, SSL and backups',
    body: 'Your site runs on infrastructure we manage. SSL certificates, daily backups, security updates and uptime are our responsibility, not a checklist we hand you.',
  },
  {
    icon: 'edit',
    title: 'The website editor',
    body: 'Open your live site inside your portal, click any text or image, change it, preview it and publish. Prices, hours, photos and copy are yours to change at any hour without asking us.',
  },
  {
    icon: 'inbox',
    title: 'Lead capture',
    body: 'Forms on your site land in your portal inbox with a status on each enquiry, and in your email the moment they are submitted. Nothing sits unnoticed in a spam folder.',
  },
  {
    icon: 'chat',
    title: 'Change requests',
    body: 'For anything you would rather we handled, send a request from the portal and track where it is. You are talking to the person who built the site.',
  },
]

const MODULE_ICONS: Record<string, IconName> = {
  booking: 'calendar',
  store: 'cart',
  accounts: 'users',
  integrations: 'plug',
}

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Everything we build, and everything we look after"
        subtitle="Every NGF site gets the same foundation. On top of that you add only the parts your business actually uses — nothing is bundled in to justify a tier."
      />

      <Section width="wide">
        <SectionHeading
          eyebrow="Included on every site"
          title="The foundation"
          subtitle="This is what you get whether you pay monthly or buy the build outright. There is no version of an NGF site that leaves any of it out."
        />
        <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {CORE.map((item) => (
            <FeatureItem key={item.title} icon={item.icon} title={item.title}>
              {item.body}
            </FeatureItem>
          ))}
        </div>
      </Section>

      <Section tone="muted" width="wide">
        <SectionHeading
          eyebrow="Add what you need"
          title="Systems that do the work for you"
          subtitle="Each of these is a real system in your portal, switched on only for the businesses that use it. This is what you are actually paying more for — not extra pages."
        />

        <ul className="mt-14 grid gap-6 lg:grid-cols-2">
          {MODULES.map((module) => (
            <Card as="li" key={module.key} className="flex flex-col p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-blue-600 dark:border-slate-800 dark:bg-slate-950 dark:text-blue-400">
                <Icon name={MODULE_ICONS[module.key] ?? 'plug'} />
              </div>

              <h3 className="mt-5 font-sora text-lg font-semibold text-slate-900 dark:text-white">
                {module.name}
              </h3>

              <p className="mt-3 font-body text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {module.summary}
              </p>

              <ul className="mt-5 flex flex-col gap-2">
                {module.includes.map((line) => (
                  <li key={line} className="flex items-start gap-2.5">
                    <Icon
                      name="check"
                      className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400"
                    />
                    <span className="font-body text-sm text-slate-700 dark:text-slate-300">
                      {line}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex-1" />

              <div className="border-t border-slate-200 pt-5 dark:border-slate-800">
                <p className="font-body text-xs text-slate-500 dark:text-slate-500">
                  Usually for: {module.bestFor}
                </p>
                <Button
                  href={contactHref(module.name)}
                  variant="ghost"
                  size="sm"
                  className="-ml-4 mt-2"
                >
                  Ask about {module.name.toLowerCase()}
                  <Icon name="arrow-right" className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </ul>

        <div className="mt-12">
          <Button href="/pricing" variant="secondary">
            See what this costs
            <Icon name="arrow-right" className="h-4 w-4" />
          </Button>
        </div>
      </Section>

      <CallToAction />
    </>
  )
}
