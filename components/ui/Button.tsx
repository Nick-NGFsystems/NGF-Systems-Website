import Link from 'next/link'
import type { ReactNode } from 'react'

const VARIANTS = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 focus-visible:outline-blue-600 shadow-sm',
  secondary:
    'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 focus-visible:outline-slate-400',
  ghost:
    'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-slate-400',
} as const

const SIZES = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-12 px-7 text-base',
} as const

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold font-body transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed'

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
 * otherwise. There is one primary per screen — that is a rule of the page,
 * not of this component, but the variants exist so it can be kept.
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
