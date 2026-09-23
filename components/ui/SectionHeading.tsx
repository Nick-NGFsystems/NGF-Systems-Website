import type { ReactNode } from 'react'

/** The eyebrow style, shared so every section labels itself identically. */
export const EYEBROW =
  'text-[12px] font-semibold uppercase tracking-[0.16em] text-sand'

/**
 * The heading block every section uses: a small uppercase eyebrow, a title,
 * and at most one line of intro. Sentence case throughout.
 *
 * `ngf*` props wire the title and intro to the portal editor on pages the
 * scraper reads (today: the home page only).
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  ngfSection,
  ngfTitleField,
  ngfSubtitleField,
  as: Tag = 'h2',
  className = '',
}: {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  ngfSection?: string
  ngfTitleField?: string
  ngfSubtitleField?: string
  as?: 'h1' | 'h2'
  className?: string
}) {
  const size = Tag === 'h1' ? 'text-[42px] sm:text-[52px]' : 'text-[32px] sm:text-[36px]'

  const titleAttrs =
    ngfTitleField && ngfSection
      ? {
          'data-ngf-field': ngfTitleField,
          'data-ngf-label': 'Heading',
          'data-ngf-type': 'text',
          'data-ngf-section': ngfSection,
        }
      : {}

  const subtitleAttrs =
    ngfSubtitleField && ngfSection
      ? {
          'data-ngf-field': ngfSubtitleField,
          'data-ngf-label': 'Intro',
          'data-ngf-type': 'textarea',
          'data-ngf-section': ngfSection,
        }
      : {}

  return (
    <div className={`max-w-2xl ${className}`}>
      {eyebrow && <p className={EYEBROW}>{eyebrow}</p>}
      <Tag
        {...titleAttrs}
        className={`${eyebrow ? 'mt-4' : ''} font-semibold tracking-[-0.02em] text-white ${size} leading-[1.12]`}
      >
        {title}
      </Tag>
      {subtitle && (
        <p {...subtitleAttrs} className="mt-5 text-[16.5px] leading-[1.65] text-muted">
          {subtitle}
        </p>
      )}
    </div>
  )
}
