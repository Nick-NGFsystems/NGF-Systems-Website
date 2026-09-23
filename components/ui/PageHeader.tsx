import Container from './Container'

/** The opening band on every page but the home page. One shape, everywhere. */
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
    <div className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40">
      <Container className="py-16 sm:py-20">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.12em] text-blue-600 dark:text-blue-400">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl font-sora text-4xl font-semibold leading-[1.12] tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          {subtitle}
        </p>
      </Container>
    </div>
  )
}
