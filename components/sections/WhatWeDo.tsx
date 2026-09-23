import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import Icon, { type IconName } from '@/components/ui/Icon'
import type { NgfSiteContent } from '@/lib/ngf'

/**
 * "What we do", in three answers rather than nine.
 *
 * The old Features section listed nine equal tiles with emoji icons, each
 * keyed `feature0`…`feature8`. That made every capability look equally
 * important, and — because each key was its own prefix — the portal editor
 * rendered NINE separate sections all labelled "Features" (recorded as P1.3
 * in the editor audit). One `data-ngf-group` fixes both problems: the client
 * sees one editable list, and the visitor sees three clear ideas.
 */

interface Pillar {
  icon: IconName
  title: string
  body: string
  bullets: string[]
}

const PILLARS: Pillar[] = [
  {
    icon: 'layout',
    title: 'We build it',
    body: 'A site designed around how your business actually sells, written and built from scratch rather than dropped into a template.',
    bullets: ['Custom design, no themes', 'Fast on a phone', 'Set up to rank locally'],
  },
  {
    icon: 'shield',
    title: 'We run it',
    body: 'Hosting, SSL, backups and security are ours to worry about. If something breaks at two in the morning, it is our phone that rings.',
    bullets: ['Hosting and SSL included', 'Daily backups', 'Updates handled for you'],
  },
  {
    icon: 'edit',
    title: 'You control it',
    body: 'Every client gets a portal. Click any text or photo on your live site, change it, publish. Your enquiries, invoices and requests live there too.',
    bullets: ['Edit your own content', 'All enquiries in one inbox', 'Ask for changes and track them'],
  },
]

/**
 * Published overrides for the group, read defensively. This site still uses
 * the nested content shape (see the known gap in CLAUDE.md), so a group comes
 * back as an array hanging off its section rather than as a flat key. An
 * unpublished or differently-shaped value falls through to the defaults
 * below — with `||`, never `??`, because a cleared field arrives as `''`.
 */
function published(ngf: NgfSiteContent | undefined, index: number) {
  const list = (ngf?.services as unknown as { pillars?: unknown })?.pillars
  if (!Array.isArray(list)) return undefined
  const entry = list[index]
  return entry && typeof entry === 'object' ? (entry as Record<string, string>) : undefined
}

export default function WhatWeDo({ ngf }: { ngf?: NgfSiteContent }) {
  const title = ngf?.services?.title || 'Three things, done properly'
  const subtitle =
    ngf?.services?.subtitle ||
    'Most web companies do one of these and hand you off for the rest. We do all three, which is why nothing falls between them.'

  return (
    <Section id="what-we-do" tone="muted" width="wide">
      <SectionHeading
        eyebrow="What we do"
        title={title}
        subtitle={subtitle}
        ngfSection="What we do"
        ngfTitleField="services.title"
        ngfSubtitleField="services.subtitle"
      />

      <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3" data-ngf-group="services.pillars">
        {PILLARS.map((pillar, index) => {
          const override = published(ngf, index)
          return (
          <div key={pillar.title}>
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-blue-600 dark:text-blue-400">
              <Icon name={pillar.icon} />
            </div>

            <h3
              data-ngf-field={`services.pillars.${index}.title`}
              data-ngf-label="Title"
              data-ngf-type="text"
              data-ngf-section="What we do"
              className="mt-5 font-sora text-xl font-semibold text-slate-900 dark:text-white"
            >
              {override?.title || pillar.title}
            </h3>

            <p
              data-ngf-field={`services.pillars.${index}.body`}
              data-ngf-label="Description"
              data-ngf-type="textarea"
              data-ngf-section="What we do"
              className="mt-3 font-body text-sm leading-relaxed text-slate-600 dark:text-slate-400"
            >
              {override?.body || pillar.body}
            </p>

            <ul className="mt-5 flex flex-col gap-2">
              {pillar.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5">
                  <Icon
                    name="check"
                    className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400"
                  />
                  <span className="font-body text-sm text-slate-700 dark:text-slate-300">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          )
        })}
      </div>

      <div className="mt-12">
        <Button href="/services" variant="secondary">
          Everything we offer
          <Icon name="arrow-right" className="h-4 w-4" />
        </Button>
      </div>
    </Section>
  )
}
