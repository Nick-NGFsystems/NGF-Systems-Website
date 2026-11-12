import type { ReactNode } from 'react'
import Container from './Container'

/**
 * One vertical rhythm for every band on the site, and one hairline between
 * them. Direction A separates sections with a rule rather than alternating
 * background tones — on a dark canvas, tonal bands muddy into each other.
 */
export default function Section({
  children,
  id,
  bleed = false,
  width = 'default',
  className = '',
}: {
  children: ReactNode
  id?: string
  /** Drop the top rule — for a section that follows one already drawing it. */
  bleed?: boolean
  width?: 'narrow' | 'default' | 'wide'
  className?: string
}) {
  return (
    <section
      id={id}
      className={`${bleed ? '' : 'border-t border-line'} py-20 sm:py-24 ${className}`}
    >
      <Container width={width}>{children}</Container>
    </section>
  )
}
