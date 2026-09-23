import type { Metadata } from 'next'
import PageHeader from '@/components/ui/PageHeader'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import Process from '@/components/sections/Process'
import CallToAction from '@/components/sections/CallToAction'
import Icon from '@/components/ui/Icon'
import { CLIENTS } from '@/lib/clients'
import { CONTACT } from '@/lib/nav'

export const metadata: Metadata = {
  title: 'About',
  description:
    'NGF Systems is a one-person web company in Hudsonville, Michigan. You talk to the person who builds and maintains your site — not an account manager.',
  alternates: { canonical: '/about' },
}

const PRINCIPLES = [
  {
    title: 'You talk to the person who builds it',
    body: 'There is no account manager relaying your message to a developer who never hears your business explained in your own words. The person who answers the phone is the person writing the code.',
  },
  {
    title: 'You can see the work before you pay',
    body: 'We build a real mockup of your site first. It is more work up front, and it means nobody buys something they have not seen.',
  },
  {
    title: 'You should not need us for small things',
    body: 'A web company that has to be called every time a price changes is selling you a dependency. Your portal exists so you can change your own content and get on with your day.',
  },
  {
    title: 'We say what something will cost',
    body: 'Prices are published. Hourly work is estimated before it starts. If a request is going to be expensive we say so before doing it, not on the invoice.',
  },
]

export default function AboutPage() {
  const industries = new Set(CLIENTS.map((c) => c.industry)).size

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A one-person web company in West Michigan"
        subtitle="NGF Systems builds, hosts and maintains websites for small businesses. It is deliberately small, which is the reason the work looks the way it does."
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Who you are working with"
              title="Small on purpose"
            />
            <div className="mt-8 flex flex-col gap-5 font-body text-base leading-relaxed text-slate-600 dark:text-slate-400">
              <p>
                NGF Systems is run by Nick, out of Hudsonville, Michigan. Every site on the work
                page was designed, built, launched and is still maintained by the same person you
                will be emailing.
              </p>
              <p>
                That is a real constraint and it is worth being honest about it: we take on fewer
                projects than an agency, and we are not the right choice for a company that needs
                a team of twelve on site next week. What it buys you is that nothing is lost in a
                handoff, nobody has to be brought up to speed on your business, and a small change
                does not have to travel through three people to get made.
              </p>
              <p>
                The other half of the answer is the platform. Rather than build every client a
                bespoke system from nothing, NGF runs its own software — the portal your site is
                managed through. That is what makes it possible for one person to look after{' '}
                {CLIENTS.length} live sites across {industries} industries without any of them
                being neglected.
              </p>
            </div>
          </div>

          <div className="lg:pt-24">
            <dl className="flex flex-col divide-y divide-slate-200 rounded-xl border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
              {[
                ['Based in', CONTACT.location],
                ['Working with', CONTACT.serviceArea],
                ['Live client sites', String(CLIENTS.length)],
                ['Industries served', String(industries)],
              ].map(([label, value]) => (
                <div key={label} className="flex items-baseline justify-between gap-4 px-5 py-4">
                  <dt className="font-body text-sm text-slate-500 dark:text-slate-500">{label}</dt>
                  <dd className="text-right font-body text-sm font-semibold text-slate-900 dark:text-white">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="How we work"
          title="Four things we hold to"
          subtitle="These are not values on a wall. They are the reasons the pricing, the portal and the mockup-first process are built the way they are."
        />

        <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {PRINCIPLES.map((principle) => (
            <div key={principle.title}>
              <div className="flex items-start gap-3">
                <Icon
                  name="check"
                  className="mt-1 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400"
                />
                <h3 className="font-sora text-base font-semibold text-slate-900 dark:text-white">
                  {principle.title}
                </h3>
              </div>
              <p className="mt-2.5 pl-8 font-body text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {principle.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Process tone="default" />

      <CallToAction />
    </>
  )
}
