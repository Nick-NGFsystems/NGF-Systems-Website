import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Icon from '@/components/ui/Icon'
import { CONTACT } from '@/lib/nav'

/**
 * The closing band on every page that is not the contact page itself. One
 * primary action, and the direct alternatives for someone who would rather
 * not fill in a form.
 */
export default function CallToAction({
  title = 'Want to see what your site could look like?',
  body = 'We build you a real mockup of your own site before you pay anything. If it is not right, you owe nothing.',
  intent,
}: {
  title?: string
  body?: string
  /** Preselects the enquiry on the contact form. Must be a known intent. */
  intent?: string
}) {
  const href = intent ? `/contact?intent=${encodeURIComponent(intent)}` : '/contact'

  return (
    <section className="border-t border-slate-200 bg-slate-900 dark:border-slate-800 dark:bg-slate-900">
      <Container className="py-16 sm:py-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="font-sora text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {title}
            </h2>
            <p className="mt-3 font-body text-base leading-relaxed text-slate-300">{body}</p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Button href={href} size="lg">
              Get a free mockup
              <Icon name="arrow-right" className="h-4 w-4" />
            </Button>
            <a
              href={CONTACT.phoneHref}
              className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-700 px-7 font-body text-base font-semibold text-white transition-colors hover:bg-slate-800"
            >
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
