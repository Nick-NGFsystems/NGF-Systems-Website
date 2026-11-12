import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import { Tick } from '@/components/ui/FeatureItem'
import ScreenshotSlot from '@/components/ui/ScreenshotSlot'
import type { NgfSiteContent } from '@/lib/ngf'

/**
 * What replaced the "We build it / We run it / You control it" three-up.
 *
 * Two of those three were table stakes — every web company builds and hosts —
 * so the section spent two thirds of its space arguing something nobody
 * doubts, and the one differentiating claim was then repeated below. This
 * shows the leads inbox instead, and answers the question a small-business
 * owner actually has: where do my enquiries go.
 *
 * It used to show a HAND-DRAWN imitation of that inbox, with invented
 * customer names in it. A real screenshot is both more convincing and not a
 * small lie about the product, so this is a ScreenshotSlot — see lib/shots.ts.
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

        <div className="overflow-hidden rounded-[18px] shadow-[inset_0_0_0_1px_rgba(16,24,40,.08),0_12px_30px_-14px_rgba(16,24,40,.18)]">
          <div className="h-[300px] sm:h-[360px]">
            <ScreenshotSlot shot="leads" />
          </div>
        </div>
      </div>
    </Section>
  )
}
