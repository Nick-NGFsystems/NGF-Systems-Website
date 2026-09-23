import type { Metadata } from 'next'
import PageHeader from '@/components/ui/PageHeader'
import Section from '@/components/ui/Section'
import WorkGrid from '@/components/sections/WorkGrid'
import CallToAction from '@/components/sections/CallToAction'
import { CLIENTS } from '@/lib/clients'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Live websites built and managed by NGF Systems — custom home building, IT services, vacation rentals, automotive, retail and aerial services across Michigan and beyond.',
  alternates: { canonical: '/work' },
}

export default function WorkPage() {
  const industries = new Set(CLIENTS.map((c) => c.industry)).size

  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Every site here is live right now"
        subtitle={`${CLIENTS.length} businesses across ${industries} industries. These are not mockups or concept pieces — click any of them and you are on a site we built and still look after today.`}
      />

      <Section width="wide">
        <WorkGrid clients={CLIENTS} detailed />

        <p className="mt-12 max-w-2xl font-body text-sm leading-relaxed text-slate-500 dark:text-slate-500">
          Each of these clients edits their own content through the NGF portal. The capabilities
          listed on each card are the systems actually switched on for that business — a shop that
          does not sell online does not have a storefront it never uses.
        </p>
      </Section>

      <CallToAction
        title="Want one of these for your business?"
        body="We will build you a mockup of your own site first, so you can see the work before you commit to any of it."
      />
    </>
  )
}
