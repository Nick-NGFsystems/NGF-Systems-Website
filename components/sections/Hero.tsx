import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Icon from '@/components/ui/Icon'
import type { NgfSiteContent } from '@/lib/ngf'
import { CLIENTS } from '@/lib/clients'

/**
 * The home page's opening statement. One sentence on what NGF does, one on
 * who for, and two actions — see the work, or start a conversation.
 *
 * The old hero was a full viewport tall with four stacked background layers,
 * an animated badge and gradient text, and said "We build websites that
 * work", which is true of every web company there has ever been. It also
 * pushed everything of substance below the fold.
 */
export default function Hero({ ngf }: { ngf?: NgfSiteContent }) {
  const headline =
    ngf?.hero?.headline || 'Websites for small businesses, built and looked after by one person.'
  const subheadline =
    ngf?.hero?.subheadline ||
    'We design the site, host it, keep it secure, and give you a portal where you can change your own text and photos whenever you want. No agency retainer, no ticket queue.'

  return (
    <div className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      {/* One restrained background wash, not four stacked gradients. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-slate-50 to-transparent dark:from-slate-900/50"
      />

      <Container className="relative py-20 sm:py-28 lg:py-32">
        <div className="max-w-3xl">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.12em] text-blue-600 dark:text-blue-400">
            Hudsonville, Michigan
          </p>

          <h1
            data-ngf-field="hero.headline"
            data-ngf-label="Headline"
            data-ngf-type="textarea"
            data-ngf-section="Hero"
            className="mt-5 font-sora text-4xl font-semibold leading-[1.1] tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl"
          >
            {headline}
          </h1>

          <p
            data-ngf-field="hero.subheadline"
            data-ngf-label="Intro"
            data-ngf-type="textarea"
            data-ngf-section="Hero"
            className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-slate-600 dark:text-slate-400"
          >
            {subheadline}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" size="lg">
              Get a free mockup
              <Icon name="arrow-right" className="h-4 w-4" />
            </Button>
            <Button href="/work" variant="secondary" size="lg">
              See our work
            </Button>
          </div>

          <p className="mt-6 font-body text-sm text-slate-500 dark:text-slate-500">
            We build you a mockup before you pay anything. If you do not like it, you owe nothing.
          </p>
        </div>

        {/* Proof, stated as a countable fact rather than a claim. */}
        <dl className="mt-16 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-8 border-t border-slate-200 dark:border-slate-800 pt-10 sm:grid-cols-3">
          <div>
            <dt className="font-body text-sm text-slate-500 dark:text-slate-500">Live client sites</dt>
            <dd className="mt-1 font-sora text-3xl font-semibold text-slate-900 dark:text-white">
              {CLIENTS.length}
            </dd>
          </div>
          <div>
            <dt className="font-body text-sm text-slate-500 dark:text-slate-500">Industries served</dt>
            <dd className="mt-1 font-sora text-3xl font-semibold text-slate-900 dark:text-white">
              {new Set(CLIENTS.map((c) => c.industry)).size}
            </dd>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <dt className="font-body text-sm text-slate-500 dark:text-slate-500">You talk to</dt>
            <dd className="mt-1 font-sora text-3xl font-semibold text-slate-900 dark:text-white">
              The builder
            </dd>
          </div>
        </dl>
      </Container>
    </div>
  )
}
