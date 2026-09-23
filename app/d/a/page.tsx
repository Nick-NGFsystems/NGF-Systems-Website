import { Space_Grotesk } from 'next/font/google'

// No monospace anywhere. It was carrying most of the "developer tool" feel —
// lowercase nav, `// what we do` section labels, EDITING · HERO.HEADLINE.
const display = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--d' })

const LINE = 'border-[#262825]'
const CARD = 'border border-[#262825] bg-gradient-to-b from-white/[0.045] to-white/[0.015]'
const EYEBROW = 'text-[12px] font-semibold uppercase tracking-[0.16em] text-[#C2A379]'
const MUTED = 'text-[#9A9C95]'

export default function DirectionA() {
  return (
    <div
      className={`${display.variable} font-[family-name:var(--d)] fixed inset-0 z-[100] overflow-y-auto bg-[#0E100F] text-white antialiased`}
    >
      {/* Nav. Sentence case, and a phone number in the open — a business that
          publishes its number reads differently from one that only has a form. */}
      <header className={`sticky top-0 z-50 border-b ${LINE}/70 bg-[#0E100F]/85 backdrop-blur-xl`}>
        <nav className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-6">
          <span className="text-[17px] font-semibold tracking-tight">
            NGF<span className="text-[#C2A379]"> Systems</span>
          </span>
          <ul className={`hidden items-center gap-8 text-[15px] ${MUTED} lg:flex`}>
            <li>Services</li><li>Work</li><li>Pricing</li><li>About</li><li>Contact</li>
          </ul>
          <div className="flex items-center gap-5">
            <span className={`hidden text-[15px] ${MUTED} lg:block`}>(906) 448-9989</span>
            <span className={`hidden text-[15px] ${MUTED} md:block`}>Client login</span>
            <span className="rounded-lg bg-[#5E8B87] px-5 py-2.5 text-[14px] font-semibold">
              Get a free mockup
            </span>
          </div>
        </nav>
      </header>

      {/* Hero. Left-aligned, two columns — a centred headline over a floating
          screenshot is the startup-landing-page shape, and it reads less like
          an established firm than a product beside a plain statement does. */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(75%_60%_at_25%_0%,rgba(94,139,135,.16),transparent_72%)]"
        />
        <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-16">
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
            <div>
              <p className={`${EYEBROW} mb-6`}>Hudsonville, Michigan</p>

              <h1 className="text-[46px] font-semibold leading-[1.08] tracking-[-0.025em] sm:text-[52px]">
                Your website, and everything you need to{' '}
                <span className="text-[#C2A379]">run it.</span>
              </h1>

              <p className={`mt-6 max-w-lg text-[17px] leading-[1.65] ${MUTED}`}>
                We design and build the site, host it, and give you one place to change your own
                words and pictures, read every enquiry, and take bookings. One person builds it, and
                you always know who to call.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-lg bg-[#5E8B87] px-7 py-3.5 text-[15px] font-semibold">
                  Get a free mockup
                </span>
                <span className={`rounded-lg border ${LINE} bg-[#171A18] px-7 py-3.5 text-[15px] font-semibold text-white/90`}>
                  See our work
                </span>
              </div>

              <p className="mt-5 text-[14.5px] text-[#7E817B]">
                You see the design before you pay anything.
              </p>
            </div>

            {/* The portal, framed as a product — not a browser window with dots. */}
            <div className={`${CARD} overflow-hidden rounded-xl shadow-[0_32px_90px_-30px_rgba(0,0,0,.8)]`}>
              <div className={`flex items-center justify-between border-b ${LINE} bg-[#171A18] px-5 py-3.5`}>
                <span className="text-[14px] font-medium text-white/80">Your portal · Website</span>
                <span className="rounded-md bg-[#C2A379]/15 px-2.5 py-1 text-[12.5px] font-medium text-[#C2A379]">
                  3 unpublished changes
                </span>
              </div>
              <div className="grid grid-cols-[190px_1fr] text-left">
                <aside className={`border-r ${LINE} bg-[#171A18]/60 p-4`}>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#7E817B]">
                    Sections
                  </p>
                  <div className="mt-3 space-y-1">
                    <div className="rounded-md bg-[#5E8B87]/20 px-3 py-2 text-[14px] font-medium">Hero</div>
                    <div className={`px-3 py-2 text-[14px] ${MUTED}`}>Services</div>
                    <div className={`px-3 py-2 text-[14px] ${MUTED}`}>Photos</div>
                    <div className={`px-3 py-2 text-[14px] ${MUTED}`}>Contact</div>
                  </div>
                  <div className={`mt-5 rounded-lg border ${LINE} bg-[#0E100F]/60 p-3.5`}>
                    <p className="text-[13.5px] text-white/80">Ready to go live</p>
                    <div className="mt-2.5 grid h-9 place-items-center rounded-md bg-[#5E8B87] text-[13.5px] font-semibold">
                      Publish
                    </div>
                  </div>
                </aside>
                <div className="bg-[#0E100F]/70 p-5">
                  <div className="rounded-lg border border-dashed border-[#5E8B87]/60 bg-[#5E8B87]/[0.07] p-4">
                    <p className="text-[12.5px] font-medium text-[#7BA39C]">Editing your headline</p>
                    <p className="mt-2 text-[19px] font-semibold leading-snug">
                      Premium window tint in Grand Rapids
                    </p>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2.5">
                    <div className={`h-20 rounded-lg border ${LINE} bg-[#171A18]`} />
                    <div className={`h-20 rounded-lg border ${LINE} bg-[#171A18]`} />
                    <div className={`h-20 rounded-lg border ${LINE} bg-[#171A18]`} />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="h-2.5 w-3/4 rounded bg-[#262825]" />
                    <div className="h-2.5 w-2/3 rounded bg-[#262825]" />
                    <div className="h-2.5 w-1/2 rounded bg-[#262825]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Credibility, stated as countable facts rather than adjectives. */}
          <dl className={`mt-20 grid gap-8 border-t ${LINE} pt-10 sm:grid-cols-4`}>
            {[
              ['6', 'Live client sites'],
              ['6', 'Industries served'],
              ['1 business day', 'Typical reply time'],
              ['West Michigan', 'And remote'],
            ].map(([value, label]) => (
              <div key={label}>
                <dd className="text-[26px] font-semibold tracking-tight">{value}</dd>
                <dt className={`mt-1.5 text-[14px] ${MUTED}`}>{label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* What you get */}
      <section className={`border-t ${LINE} py-24`}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
            <div>
              <p className={EYEBROW}>What you get</p>
              <h2 className="mt-4 text-[36px] font-semibold leading-[1.12] tracking-[-0.02em]">
                Every enquiry, in one place you own.
              </h2>
              <p className={`mt-5 text-[16.5px] leading-[1.65] ${MUTED}`}>
                Contact forms on your site do not vanish into a personal inbox. They arrive in your
                portal with a status on each one, and in your email the moment they are sent.
              </p>
              <ul className="mt-8 space-y-3.5">
                {[
                  'Change your own text and photos, then publish',
                  'Every enquiry tracked, none lost to a spam folder',
                  'Bookings and orders in the same place, if you sell that way',
                  'Hosting, security and backups handled without you asking',
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#C2A379]" />
                    <span className="text-[15.5px] leading-relaxed text-white/85">{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`${CARD} overflow-hidden rounded-xl`}>
              <div className={`flex items-center justify-between border-b ${LINE} bg-[#171A18] px-5 py-4`}>
                <span className="text-[14px] font-medium text-white/80">Your enquiries</span>
                <span className="rounded-md bg-[#5E8B87]/20 px-2.5 py-1 text-[12.5px] font-medium text-[#7BA39C]">
                  4 new
                </span>
              </div>
              <div className="divide-y divide-[#262825]">
                {[
                  ['Dana Whitfield', 'Ceramic tint, full vehicle', 'New', 'bg-[#5E8B87]/20 text-[#7BA39C]'],
                  ['Marcus Webb', 'Quote for storefront film', 'New', 'bg-[#5E8B87]/20 text-[#7BA39C]'],
                  ['Priya Raman', 'Two cars, asked about timing', 'Replied', 'bg-white/[0.07] text-[#9A9C95]'],
                  ['Tom Alderman', 'Vinyl wrap, colour samples', 'Won', 'bg-[#C2A379]/20 text-[#C2A379]'],
                ].map(([name, note, status, chip]) => (
                  <div key={name} className="flex items-center justify-between gap-4 px-5 py-4">
                    <div className="min-w-0">
                      <p className="truncate text-[15px] font-medium">{name}</p>
                      <p className={`mt-0.5 truncate text-[13.5px] ${MUTED}`}>{note}</p>
                    </div>
                    <span className={`shrink-0 rounded-md px-2.5 py-1 text-[12.5px] font-medium ${chip}`}>
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work */}
      <section className={`border-t ${LINE} py-24`}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-end justify-between">
            <div>
              <p className={EYEBROW}>Recent work</p>
              <h2 className="mt-4 text-[36px] font-semibold tracking-[-0.02em]">
                Every one of these is live.
              </h2>
            </div>
            <span className={`text-[15px] ${MUTED}`}>See all six →</span>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ['Automotive', 'West Michigan Window Tint', 'westmiwindowtint.com', 'Grand Rapids, MI', 'from-[#1C2426]'],
              ['Vacation rentals', 'Square K Vacations', 'squarekvacations.com', 'Fennville & Bellaire, MI', 'from-[#24231E]'],
              ['Retail', 'NOMA Fine Jewelry', 'noelleandmary.com', 'Michigan', 'from-[#201F24]'],
            ].map(([tag, name, url, place, grad]) => (
              <div key={name as string} className={`${CARD} overflow-hidden rounded-xl`}>
                <div className={`h-40 bg-gradient-to-br ${grad as string} to-[#121412]`} />
                <div className="p-5">
                  <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-[#C2A379]">
                    {tag as string}
                  </p>
                  <h3 className="mt-2.5 text-[17.5px] font-semibold">{name as string}</h3>
                  <p className={`mt-1 text-[13.5px] ${MUTED}`}>{place as string}</p>
                  <p className="mt-3 text-[14px] text-[#7BA39C]">{url as string}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className={`border-t ${LINE} py-24`}>
        <div className="mx-auto max-w-6xl px-6">
          <p className={EYEBROW}>Pricing</p>
          <h2 className="mt-4 max-w-3xl text-[36px] font-semibold leading-[1.12] tracking-[-0.02em]">
            Priced by what your site does. Never by page count.
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-[1fr_1fr_1.2fr]">
            <div className={`${CARD} rounded-xl p-6`}>
              <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-[#7E817B]">
                Monthly plan
              </p>
              <p className="mt-4 text-[40px] font-semibold tracking-tight">
                $100<span className={`text-[17px] ${MUTED}`}>/mo</span>
              </p>
              <p className={`mt-3 text-[14.5px] ${MUTED}`}>We own and run it. Cancel any time.</p>
            </div>
            <div className={`${CARD} rounded-xl p-6`}>
              <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-[#7E817B]">
                One-time build
              </p>
              <p className="mt-4 text-[40px] font-semibold tracking-tight">$600</p>
              <p className={`mt-3 text-[14.5px] ${MUTED}`}>You own it outright.</p>
            </div>
            <div className="rounded-xl border border-[#5E8B87]/40 bg-[#5E8B87]/[0.08] p-6">
              <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-[#7BA39C]">
                Add what you need
              </p>
              <div className="mt-4 space-y-2.5">
                {[
                  ['Online booking', '+$50/mo', true],
                  ['Online store', '+$75/mo', true],
                  ['Customer accounts', 'Quoted', false],
                ].map(([l, v, acc]) => (
                  <div
                    key={l as string}
                    className={`flex items-center justify-between rounded-lg border ${LINE} bg-[#0E100F]/50 px-3.5 py-2.5`}
                  >
                    <span className="text-[14.5px]">{l as string}</span>
                    <span className={`text-[13.5px] font-medium ${acc ? 'text-[#C2A379]' : MUTED}`}>
                      {v as string}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer. A landing page ends at the last CTA; a business has a footer
          with a name, a place and a way to reach a person. */}
      <footer className={`border-t ${LINE} bg-[#0B0D0C]`}>
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2 max-w-sm">
              <p className="text-[17px] font-semibold tracking-tight">
                NGF<span className="text-[#C2A379]"> Systems</span>
              </p>
              <p className={`mt-3 text-[14.5px] leading-relaxed ${MUTED}`}>
                We build, host and look after websites for small businesses — with a portal you run
                yourself.
              </p>
              <p className="mt-4 text-[14px] text-[#7E817B]">Hudsonville, Michigan</p>
            </div>
            <div>
              <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-white">Pages</p>
              <ul className={`mt-4 space-y-2.5 text-[14.5px] ${MUTED}`}>
                <li>Services</li><li>Work</li><li>Pricing</li><li>About</li><li>Contact</li>
              </ul>
            </div>
            <div>
              <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-white">Get in touch</p>
              <ul className={`mt-4 space-y-2.5 text-[14.5px] ${MUTED}`}>
                <li>nick@ngfsystems.com</li>
                <li>(906) 448-9989</li>
                <li className="pt-1 text-[#7BA39C]">Client login</li>
              </ul>
            </div>
          </div>
          <div className={`mt-12 border-t ${LINE} pt-6`}>
            <p className="text-[13px] text-[#7E817B]">
              © 2026 NGF Systems LLC. Serving West Michigan and remote.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
