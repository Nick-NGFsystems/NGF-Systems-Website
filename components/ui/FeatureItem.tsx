import Icon, { type IconName } from './Icon'

/**
 * A capability, stated as a title and one short paragraph with a line icon.
 * Used by the home page, Services and Pricing so the same fact is described
 * the same way wherever a visitor meets it.
 */
export default function FeatureItem({
  icon,
  title,
  children,
  ngf,
}: {
  icon: IconName
  title: string
  children: React.ReactNode
  /** Portal-editor wiring, for pages the scraper reads. */
  ngf?: { section: string; titleField: string; bodyField: string }
}) {
  const titleAttrs = ngf
    ? {
        'data-ngf-field': ngf.titleField,
        'data-ngf-label': 'Title',
        'data-ngf-type': 'text',
        'data-ngf-section': ngf.section,
      }
    : {}
  const bodyAttrs = ngf
    ? {
        'data-ngf-field': ngf.bodyField,
        'data-ngf-label': 'Description',
        'data-ngf-type': 'textarea',
        'data-ngf-section': ngf.section,
      }
    : {}

  return (
    <div className="flex gap-4">
      <div className="shrink-0 mt-0.5 flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-blue-600 dark:text-blue-400">
        <Icon name={icon} />
      </div>
      <div>
        <h3
          {...titleAttrs}
          className="font-sora font-semibold text-base text-slate-900 dark:text-white"
        >
          {title}
        </h3>
        <p
          {...bodyAttrs}
          className="mt-1.5 font-body text-sm leading-relaxed text-slate-600 dark:text-slate-400"
        >
          {children}
        </p>
      </div>
    </div>
  )
}
