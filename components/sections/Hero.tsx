import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Icon from '@/components/ui/Icon'
import { EYEBROW } from '@/components/ui/SectionHeading'
import { WebsiteEditorPanel } from './PortalPanels'
import type { NgfSiteContent } from '@/lib/ngf'
import { CLIENTS } from '@/lib/clients'
import { CONTACT } from '@/lib/nav'

/**
 * Left-aligned and two-column: a statement beside the product.
 *
 * A centred headline floating over a screenshot is the startup landing-page
 * shape, and it reads less like an established firm. The stat row states
 * countable facts rather than adjectives, and every figure is derived rather
 * than typed, so it cannot drift from reality.
 */
export default function Hero({ ngf }: { ngf?: NgfSiteContent }) {
  const headline = ngf?.hero?.headline || 'Your website, and everything you need to run it.'
  const subheadline =
    ngf?.hero?.subheadline ||
    'We design and build the site, host it, and give you one place to change your own words and pictures, read every enquiry, and take bookings. One person builds it, and you always know who to call.'

  const industries = new Set(CLIENTS.map((c) => c.industry)).size

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(75%_60%_at_25%_0%,rgba(94,139,135,.16),transparent_72%)]"
      />

      <Container className="relative pb-16 pt-16 sm:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
          <div>
            <p className={EYEBROW}>{CONTACT.location}</p>

            <h1
              data-ngf-field="hero.headline"
              data-ngf-label="Headline"
              data-ngf-type="textarea"
              data-ngf-section="Hero"
              className="mt-6 text-[40px] font-semibold leading-[1.08] tracking-[-0.025em] text-white sm:text-[52px]"
            >
              {headline}
            </h1>

            <p
              data-ngf-field="hero.subheadline"
              data-ngf-label="Intro"
              data-ngf-type="textarea"
              data-ngf-section="Hero"
              className="mt-6 max-w-lg text-[17px] leading-[1.65] text-muted"
            >
              {subheadline}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact" size="lg">
                Get a free mockup
                <Icon name="arrow-right" className="h-4 w-4" />
              </Button>
              <Button href="/work" variant="secondary" size="lg">
                See our work
              </Button>
            </div>

            <p className="mt-5 text-[14.5px] text-dim">
              You see the design before you pay anything.
            </p>
          </div>

          <WebsiteEditorPanel className="shadow-[0_32px_90px_-30px_rgba(0,0,0,.8)]" />
        </div>

        <dl className="mt-16 grid gap-8 border-t border-line pt-10 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [String(CLIENTS.length), 'Live client sites'],
            [String(industries), 'Industries served'],
            ['1 business day', 'Typical reply time'],
            ['West Michigan', 'And remote'],
          ].map(([value, label]) => (
            <div key={label}>
              <dd className="text-[26px] font-semibold tracking-tight text-white">{value}</dd>
              <dt className="mt-1.5 text-[14px] text-muted">{label}</dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
