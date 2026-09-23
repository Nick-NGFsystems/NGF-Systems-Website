import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import { TERMS } from '@/lib/pricing'

/**
 * How a project actually runs. This is the most common thing a small-business
 * owner is anxious about — what will be asked of me, and when do I pay — and
 * the old site answered none of it.
 *
 * The figures come from lib/pricing.ts, which mirrors the contract, so the
 * process described here cannot drift from the terms the client signs.
 */

const STEPS = [
  {
    title: 'We talk',
    body: 'Twenty minutes on what your business does, who buys from you, and what the site has to achieve. No charge and no obligation.',
  },
  {
    title: 'We build you a mockup',
    body: `You see a real design of your actual site before you have paid anything. ${TERMS.freeMockupRevisionRounds} rounds of changes are included.`,
  },
  {
    title: 'You approve, then we build',
    body: 'Once the design is right we build it properly — content, photos, forms, and whatever your business needs on top.',
  },
  {
    title: 'We launch and hand you the keys',
    body: 'Domain pointed, SSL live, analytics wired up. You get your portal login and a walkthrough of how to change your own content.',
  },
  {
    title: 'We keep it running',
    body: 'Hosting, security and backups are ours. Change your own content whenever you like, or send us a request and track it.',
  },
]

export default function Process({ tone = 'muted' }: { tone?: 'default' | 'muted' }) {
  return (
    <Section id="process" tone={tone}>
      <SectionHeading
        eyebrow="How it works"
        title="You see the site before you pay for it"
        subtitle="Five steps, and the first two cost you nothing. Most businesses are live within a few weeks of the first conversation."
      />

      <ol className="mt-14 flex flex-col">
        {STEPS.map((step, index) => (
          <li
            key={step.title}
            className="relative flex gap-6 pb-10 last:pb-0"
          >
            {/* The rail, drawn between markers rather than under the last one. */}
            {index < STEPS.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute left-[19px] top-10 bottom-0 w-px bg-slate-200 dark:bg-slate-800"
              />
            )}

            <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white font-sora text-sm font-semibold text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-white">
              {index + 1}
            </span>

            <div className="pt-1.5">
              <h3 className="font-sora text-base font-semibold text-slate-900 dark:text-white">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xl font-body text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
