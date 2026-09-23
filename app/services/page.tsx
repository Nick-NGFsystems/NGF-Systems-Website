import type { Metadata } from 'next'
import PageHeader from '@/components/ui/PageHeader'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import FeatureItem, { Tick } from '@/components/ui/FeatureItem'
import Card from '@/components/ui/Card'
import Icon, { type IconName } from '@/components/ui/Icon'
import Button from '@/components/ui/Button'
import CallToAction from '@/components/sections/CallToAction'
import PortalShowcase from '@/components/sections/PortalShowcase'
import { MODULES, contactHref } from '@/lib/pricing'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'What NGF Systems builds and manages: custom website design, hosting and security, a client portal you run yourself, online booking, online stores, and custom integrations.',
  alternates: { canonical: '/services' },
}

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
    body: 'Your site runs on infrastructure we manage. Certificates, daily backups, security updates and uptime are our responsibility, not a checklist we hand you.',
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

      <Section bleed>
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

      <PortalShowcase />

      <Section>
        <SectionHeading
          eyebrow="Add what you need"
          title="Systems that do the work for you"
          subtitle="Each of these is a real system in your portal, switched on only for the businesses that use it. This is what you are paying more for — not extra pages."
        />

        <ul className="mt-14 grid gap-5 lg:grid-cols-2">
          {MODULES.map((module) => (
            <Card as="li" key={module.key} className="flex flex-col p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-panel text-accent-light">
                <Icon name={MODULE_ICONS[module.key] ?? 'plug'} />
              </div>

              <h3 className="mt-5 text-[18px] font-semibold text-white">{module.name}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{module.summary}</p>

              <ul className="mt-5 space-y-2.5">
                {module.includes.map((line) => (
                  <Tick key={line}>{line}</Tick>
                ))}
              </ul>

              <div className="mt-6 flex-1" />

              <div className="border-t border-line pt-5">
                <p className="text-[13px] text-dim">Usually for: {module.bestFor}</p>
                <Button href={contactHref(module.name)} variant="ghost" size="sm" className="-ml-1 mt-2">
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
