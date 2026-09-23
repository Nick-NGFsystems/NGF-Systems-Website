import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import Icon, { type IconName } from '@/components/ui/Icon'

/**
 * The portal — the thing NGF has that a freelancer with a template does not.
 *
 * Each row is a real capability in the platform
 * (NGF-Systems-app/lib/portal-capabilities.ts). Nothing here is aspirational.
 */
const CAPABILITIES: { icon: IconName; title: string; body: string }[] = [
  {
    icon: 'edit',
    title: 'Website editor',
    body: 'Your live site, with click-to-edit text and images. Change a price, swap a photo, preview it, publish it. No code and no waiting on us.',
  },
  {
    icon: 'inbox',
    title: 'Leads',
    body: 'Every enquiry your site takes, in one inbox with a status on each one, so nothing gets lost in a personal email account.',
  },
  {
    icon: 'chat',
    title: 'Change requests',
    body: 'Ask for something you would rather we did, and watch where it is. Not a ticket into the void.',
  },
  {
    icon: 'calendar',
    title: 'Bookings',
    body: 'Your services, your hours, your time off, and every appointment customers have booked themselves.',
  },
  {
    icon: 'cart',
    title: 'Orders and store',
    body: 'Products, orders as they arrive, and the shipping, tax and policy settings behind them.',
  },
  {
    icon: 'shield',
    title: 'Invoices',
    body: 'Your plan, your past invoices and payments, and a link to settle anything outstanding.',
  },
]

export default function PortalShowcase() {
  return (
    <Section id="portal">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Your portal"
            title="Your website is not a black box"
            subtitle="Every client gets an account at app.ngfsystems.com. It is where your site, your enquiries and your billing all live — and you only ever see the parts that apply to your business."
          />
          <p className="mt-6 text-[15px] leading-relaxed text-muted">
            A restaurant does not need a storefront. A jeweller does not need a booking diary. We
            switch on what you use and leave the rest out, so the portal stays something you can
            learn in an afternoon.
          </p>
        </div>

        <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {CAPABILITIES.map(({ icon, title, body }) => (
            <li key={title}>
              <div className="flex items-center gap-2.5">
                <span className="text-accent-light">
                  <Icon name={icon} className="h-[18px] w-[18px]" />
                </span>
                <h3 className="text-[16px] font-semibold text-white">{title}</h3>
              </div>
              <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
