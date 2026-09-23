import type { ReactNode } from 'react'

/**
 * The one panel on the site. Flat by default — a border and a little radius,
 * no drop shadow — because the old page put a coloured shadow on everything
 * and nothing read as more important than anything else.
 */
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
      className={`rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 ${
        interactive
          ? 'transition-colors hover:border-slate-300 dark:hover:border-slate-700'
          : ''
      } ${className}`}
    >
      {children}
    </Tag>
  )
}
