import type { ReactNode } from 'react'

/**
 * The one panel on the site. On a dark canvas a card cannot be "white with a
 * border" — it is a hairline plus the faintest lift, so it reads as raised
 * without turning into a grey box.
 */
export const CARD_SURFACE =
  'border border-line bg-gradient-to-b from-white/[0.045] to-white/[0.015]'

export default function Card({
  children,
  className = '',
  interactive = false,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  /** Adds hover affordance. Only for cards that are themselves a link. */
  interactive?: boolean
  as?: 'div' | 'li' | 'article'
}) {
  return (
    <Tag
      className={`${CARD_SURFACE} rounded-xl ${
        interactive ? 'transition-colors hover:border-[#343733]' : ''
      } ${className}`}
    >
      {children}
    </Tag>
  )
}

/** The header strip used on panels that depict a portal surface. */
export function CardHeader({
  title,
  badge,
  badgeTone = 'accent',
}: {
  title: string
  badge?: string
  badgeTone?: 'accent' | 'sand'
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line bg-panel px-5 py-3.5">
      <span className="text-[14px] font-medium text-white/80">{title}</span>
      {badge && (
        <span
          className={`shrink-0 rounded-md px-2.5 py-1 text-[12.5px] font-medium ${
            badgeTone === 'sand' ? 'bg-sand/15 text-sand' : 'bg-accent/20 text-accent-light'
          }`}
        >
          {badge}
        </span>
      )}
    </div>
  )
}
