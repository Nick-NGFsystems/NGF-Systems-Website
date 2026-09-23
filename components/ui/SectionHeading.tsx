import type { ReactNode } from 'react'

/**
 * The heading block every section uses: a small uppercase eyebrow, a title,
 * and at most one line of subtitle. Sentence case throughout — the old page
 * mixed Title Case headings with sentence-case body and read as a template.
 *
 * `ngfField` wires the title and subtitle to the portal editor when the page
 * is one the scraper reads (today: the home page only).
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  ngfSection,
  ngfTitleField,
  ngfSubtitleField,
  as: Tag = 'h2',
}: {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  align?: 'left' | 'center'
  ngfSection?: string
  ngfTitleField?: string
  ngfSubtitleField?: string
  as?: 'h1' | 'h2'
}) {
  const alignment = align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'
  const size =
    Tag === 'h1'
      ? 'text-4xl sm:text-5xl lg:text-6xl'
      : 'text-3xl sm:text-4xl'

  const ngfTitleAttrs =
    ngfTitleField && ngfSection
      ? {
          'data-ngf-field': ngfTitleField,
          'data-ngf-label': 'Heading',
          'data-ngf-type': 'text',
          'data-ngf-section': ngfSection,
        }
      : {}

  const ngfSubtitleAttrs =
    ngfSubtitleField && ngfSection
      ? {
          'data-ngf-field': ngfSubtitleField,
          'data-ngf-label': 'Intro',
          'data-ngf-type': 'textarea',
          'data-ngf-section': ngfSection,
        }
      : {}

  return (
    <div className={alignment}>
      {eyebrow && (
        <p className="font-body text-xs font-semibold uppercase tracking-[0.12em] text-blue-600 dark:text-blue-400 mb-4">
          {eyebrow}
        </p>
      )}
      <Tag
        {...ngfTitleAttrs}
        className={`font-sora font-semibold tracking-tight text-slate-900 dark:text-white ${size} leading-[1.12]`}
      >
        {title}
      </Tag>
      {subtitle && (
        <p
          {...ngfSubtitleAttrs}
          className="mt-5 font-body text-lg leading-relaxed text-slate-600 dark:text-slate-400"
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
