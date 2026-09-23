import type { Metadata } from 'next'
import { Suspense } from 'react'
import PageHeader from '@/components/ui/PageHeader'
import Section from '@/components/ui/Section'
import ContactForm from '@/components/sections/ContactForm'
import Icon from '@/components/ui/Icon'
import { CONTACT, PORTAL_URL } from '@/lib/nav'
import { TERMS } from '@/lib/pricing'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Talk to NGF Systems about a new website. Free mockup before you commit, no obligation, and a reply within one business day.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell us what your business needs"
        subtitle="We will come back within one business day, usually with a couple of questions and a straight answer on whether we are the right fit."
      />

      <Section width="wide">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-16">
          <div>
            {/* The form reads ?intent= on mount, so it needs a Suspense
                boundary for the static shell to prerender cleanly. */}
            <Suspense
              fallback={
                <div className="h-[520px] rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900" />
              }
            >
              <ContactForm />
            </Suspense>
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <h2 className="font-sora text-base font-semibold text-slate-900 dark:text-white">
                Or reach us directly
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                <li>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="inline-flex items-center gap-2.5 font-body text-sm text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                  >
                    <Icon name="inbox" className="h-4 w-4 shrink-0 text-slate-400" />
                    <span className="break-all">{CONTACT.email}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT.phoneHref}
                    className="inline-flex items-center gap-2.5 font-body text-sm text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                  >
                    <Icon name="chat" className="h-4 w-4 shrink-0 text-slate-400" />
                    {CONTACT.phone}
                  </a>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="font-sora text-base font-semibold text-slate-900 dark:text-white">
                What happens next
              </h2>
              <ol className="mt-4 flex flex-col gap-3">
                {[
                  'We reply within one business day.',
                  'A short call about what your business does.',
                  `A real mockup of your site, with ${TERMS.freeMockupRevisionRounds} rounds of changes included.`,
                  'You decide. If it is not right, you owe nothing.',
                ].map((line, index) => (
                  <li key={line} className="flex gap-3">
                    <span className="font-body text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {index + 1}.
                    </span>
                    <span className="font-body text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {line}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="font-sora text-base font-semibold text-slate-900 dark:text-white">
                Where we work
              </h2>
              <p className="mt-3 font-body text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Based in {CONTACT.location}. Most clients are in West Michigan, but the work is
                remote-friendly — one of our sites is run from New Zealand.
              </p>
            </div>

            <div className="border-t border-slate-200 pt-6 dark:border-slate-800">
              <p className="font-body text-sm text-slate-600 dark:text-slate-400">
                Already a client?{' '}
                <a
                  href={PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-600 hover:underline dark:text-blue-400 underline-offset-4"
                >
                  Sign in to your portal
                </a>{' '}
                to send a change request — it gets tracked properly there.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
