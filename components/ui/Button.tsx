import Link from 'next/link'
import type { ReactNode } from 'react'

const VARIANTS = {
  primary: 'bg-accent text-white hover:bg-accent-hover',
  secondary: 'border border-line bg-panel text-white/90 hover:border-line hover:bg-[#1E2220]',
  ghost: 'text-muted hover:text-white',
} as const

const SIZES = {
  sm: 'h-10 px-5 text-[14px]',
  md: 'h-11 px-6 text-[15px]',
  lg: 'h-12 px-7 text-[15px]',
} as const

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed'

interface ButtonProps {
  children: ReactNode
  variant?: keyof typeof VARIANTS
  size?: keyof typeof SIZES
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
  /** Set for links that leave the site. Adds the safe rel and a new tab. */
  external?: boolean
}

/**
 * One button. Renders a Next `<Link>` when `href` is given, a `<button>`
 * otherwise. There is one primary per screen — a rule of the page, not of
 * this component, but the variants exist so it can be kept.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  disabled,
  className = '',
  external,
}: ButtonProps) {
  const classes = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}
