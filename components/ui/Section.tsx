import type { ReactNode } from 'react'
import Container from './Container'

/**
 * One vertical rhythm for every band on the site, and one place that decides
 * what a "muted" band looks like. Sections alternate tone rather than each
 * inventing a gradient, which is what made the old page feel busy.
 */
export default function Section({
  children,
  id,
  tone = 'default',
  width = 'default',
  className = '',
}: {
  children: ReactNode
  id?: string
  tone?: 'default' | 'muted'
  width?: 'narrow' | 'default' | 'wide'
  className?: string
}) {
  const bg =
    tone === 'muted'
      ? 'bg-slate-50 dark:bg-slate-900/40 border-y border-slate-200/70 dark:border-slate-800'
      : 'bg-white dark:bg-slate-950'

  return (
    <section id={id} className={`${bg} py-20 sm:py-28 ${className}`}>
      <Container width={width}>{children}</Container>
    </section>
  )
}
