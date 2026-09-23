import Container from './Container'
import { EYEBROW } from './SectionHeading'

/**
 * The opening band on every page but the home page. One soft wash behind it,
 * matching the hero, so an inner page reads as part of the same site rather
 * than a plain dark rectangle.
 */
export default function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle: string
}) {
  return (
    <div className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-[radial-gradient(75%_70%_at_25%_0%,rgba(94,139,135,.14),transparent_72%)]"
      />
      <Container className="relative py-16 sm:py-20">
        <p className={EYEBROW}>{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-[38px] font-semibold leading-[1.1] tracking-[-0.025em] text-white sm:text-[46px]">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-[17px] leading-[1.65] text-muted">{subtitle}</p>
      </Container>
    </div>
  )
}
