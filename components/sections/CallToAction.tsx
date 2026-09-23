import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Icon from '@/components/ui/Icon'
import { CONTACT } from '@/lib/nav'

/**
 * The closing band on every page that is not the contact page itself. One
 * primary action, and the direct alternative for someone who would rather not
 * fill in a form.
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
    <section className="relative overflow-hidden border-t border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_120%_at_80%_50%,rgba(94,139,135,.14),transparent_70%)]"
      />
      <Container className="relative py-16 sm:py-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-[26px] font-semibold tracking-tight text-white sm:text-[32px]">
              {title}
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-muted">{body}</p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button href={href} size="lg">
              Get a free mockup
              <Icon name="arrow-right" className="h-4 w-4" />
            </Button>
            <a
              href={CONTACT.phoneHref}
              className="inline-flex h-12 items-center justify-center rounded-lg border border-line bg-panel px-7 text-[15px] font-semibold text-white transition-colors hover:bg-[#1E2220]"
            >
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
