import type { ReactNode } from 'react'

const WIDTHS = {
  narrow: 'max-w-3xl',
  default: 'max-w-6xl',
  wide: 'max-w-7xl',
} as const

/** The one horizontal rhythm on the site. Nothing sets its own page margin. */
export default function Container({
  children,
  width = 'default',
  className = '',
}: {
  children: ReactNode
  width?: keyof typeof WIDTHS
  className?: string
}) {
  return <div className={`${WIDTHS[width]} mx-auto px-6 sm:px-8 ${className}`}>{children}</div>
}
