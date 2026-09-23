import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import { Tick } from '@/components/ui/FeatureItem'
import { LeadsPanel } from './PortalPanels'
import type { NgfSiteContent } from '@/lib/ngf'

/**
 * What replaced the "We build it / We run it / You control it" three-up.
 *
 * Two of those three were table stakes — every web company builds and hosts —
 * so the section spent two thirds of its space arguing something nobody
 * doubts, and the one differentiating claim was then repeated below. This
 * shows the leads inbox instead, and answers the question a small-business
 * owner actually has: where do my enquiries go.
 */
export default function WhatYouGet({ ngf }: { ngf?: NgfSiteContent }) {
  const title = ngf?.services?.title || 'Every enquiry, in one place you own.'
  const subtitle =
    ngf?.services?.subtitle ||
    'Contact forms on your site do not vanish into a personal inbox. They arrive in your portal with a status on each one, and in your email the moment they are sent.'

  return (
    <Section id="what-you-get">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="What you get"
            title={title}
            subtitle={subtitle}
            ngfSection="What you get"
            ngfTitleField="services.title"
            ngfSubtitleField="services.subtitle"
          />
          <ul className="mt-8 space-y-3.5">
            {[
              'Change your own text and photos, then publish',
              'Every enquiry tracked, none lost to a spam folder',
              'Bookings and orders in the same place, if you sell that way',
              'Every publish saved, so a change you regret is one click back',
            ].map((line) => (
              <Tick key={line}>{line}</Tick>
            ))}
          </ul>
        </div>

        <LeadsPanel />
      </div>
    </Section>
  )
}
