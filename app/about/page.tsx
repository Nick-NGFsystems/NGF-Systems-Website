import type { Metadata } from 'next'
import PageHeader from '@/components/ui/PageHeader'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import Process from '@/components/sections/Process'
import CallToAction from '@/components/sections/CallToAction'
import Icon from '@/components/ui/Icon'
import { CONTACT } from '@/lib/nav'

export const metadata: Metadata = {
  title: 'About',
  description:
    'You talk to the people who build and maintain your site — not an account manager relaying messages. NGF Systems builds, hosts and looks after websites for small businesses in West Michigan.',
  alternates: { canonical: '/about' },
}

const PRINCIPLES = [
  {
    title: 'You talk to the people who build it',
    body: 'There is no account manager relaying your message to a developer who never hears your business explained in your own words. Whoever answers the phone is whoever is writing the code.',
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

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="You talk to the people who build your site"
        subtitle="NGF Systems builds, hosts and maintains websites for small businesses in West Michigan. No account manager in the middle, and no handing your business off to someone who has never heard you explain it."
      />

      <Section bleed>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-20">
          <div>
            <SectionHeading eyebrow="Who you are working with" title="Nothing is lost in a handoff" />
            <div className="mt-8 flex flex-col gap-5 text-[16px] leading-relaxed text-muted">
              <p>
                NGF Systems is run by Nick, out of {CONTACT.location}. Every site on the work page
                was designed, built, launched and is still maintained here — and the person who
                answers your email is the person doing that work.
              </p>
              <p>
                It is worth being straight about what that means. We take on fewer projects at a
                time than an agency does, because each one gets proper attention rather than being
                passed down a chain. What you get for it is that nothing is lost in a handoff,
                nobody has to be brought up to speed on your business, and a small change does not
                have to travel through three people to get made.
              </p>
              <p>
                The other half of the answer is the platform. Rather than build every client a
                bespoke system from nothing, NGF runs its own software — the portal your site is
                managed through. That is what makes it possible to look after a portfolio of live
                client sites without any of them being neglected.
              </p>
            </div>
          </div>

          <div className="lg:pt-24">
            <dl className="flex flex-col divide-y divide-line rounded-xl border border-line">
              {[
                ['Based in', CONTACT.location],
                ['Working with', CONTACT.serviceArea],
              ].map(([label, value]) => (
                <div key={label} className="flex items-baseline justify-between gap-4 px-5 py-4">
                  <dt className="text-[14.5px] text-muted">{label}</dt>
                  <dd className="text-right text-[14.5px] font-semibold text-head">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="How we work"
          title="Four things we hold to"
          subtitle="These are not values on a wall. They are the reasons the pricing, the portal and the mockup-first process are built the way they are."
        />

        <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {PRINCIPLES.map((principle) => (
            <div key={principle.title}>
              <div className="flex items-start gap-3">
                <Icon name="check" className="mt-1 h-5 w-5 shrink-0 text-sand" />
                <h3 className="text-[16.5px] font-semibold text-head">{principle.title}</h3>
              </div>
              <p className="mt-2.5 pl-8 text-[15px] leading-relaxed text-muted">{principle.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Process />

      <CallToAction />
    </>
  )
}
