import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'

const display = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--d' })
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--m' })

const D = 'font-[family-name:var(--d)]'
const M = 'font-[family-name:var(--m)]'
const CARD = 'border border-[#242B2E] bg-gradient-to-b from-white/[0.05] to-white/[0.02]'

export default function DirectionA() {
  return (
    <div className={`${display.variable} ${mono.variable} ${D} fixed inset-0 z-[100] overflow-y-auto bg-[#0F1214] text-white antialiased`}>
      {/* nav */}
      <header className="sticky top-0 z-50 border-b border-[#242B2E]/70 bg-[#0F1214]/70 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="grid h-7 w-7 place-items-center rounded-md bg-[#5E8B87] text-[13px] font-bold">N</div>
            <span className="text-[15px] font-semibold tracking-tight">NGF Systems</span>
          </div>
          <ul className={`${M} hidden items-center gap-7 text-[12.5px] text-[#8C9598] md:flex`}>
            <li>services</li><li>work</li><li>pricing</li><li>about</li>
          </ul>
          <div className="flex items-center gap-3">
            <span className={`${M} hidden text-[12.5px] text-[#8C9598] md:block`}>client login</span>
            <span className="rounded-lg bg-white px-4 py-2 text-[13px] font-semibold text-[#0F1214]">Get a free mockup</span>
          </div>
        </nav>
      </header>

      {/* hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:56px_56px]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(60%_50%_at_50%_0%,rgba(94,139,135,.32),transparent_70%)]"
        />
        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-16 text-center">
          <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-[#242B2E] bg-[#161B1D]/80 px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C2A379]" />
            <span className={`${M} text-[12px] text-[#8C9598]`}>6 client sites live on the platform</span>
          </div>

          <h1 className="mx-auto max-w-4xl text-[58px] font-semibold leading-[1.02] tracking-[-0.03em]">
            Your website, and the
            <br />
            software to actually{' '}
            <span className="bg-gradient-to-r from-[#5E8B87] via-[#7BA39C] to-[#C2A379] bg-clip-text text-transparent">
              run it.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-[#8C9598]">
            We build the site, host it, and hand you a portal where you edit your own content, read
            every enquiry, and take bookings. One person builds it. You never wait on a ticket queue.
          </p>

          <div className="mt-9 flex items-center justify-center gap-3">
            <span className="rounded-lg bg-[#5E8B87] px-6 py-3.5 text-[14px] font-semibold shadow-[0_8px_30px_-6px_rgba(94,139,135,.55)]">
              Get a free mockup
            </span>
            <span className="rounded-lg border border-[#242B2E] bg-[#161B1D] px-6 py-3.5 text-[14px] font-semibold text-white/90">
              See our work
            </span>
          </div>

          {/* product UI */}
          <div className="relative mx-auto mt-20 max-w-5xl">
            <div className={`${CARD} overflow-hidden rounded-2xl shadow-[0_40px_120px_-30px_rgba(0,0,0,.9)]`}>
              <div className="flex items-center gap-2 border-b border-[#242B2E] bg-[#161B1D] px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#2A3235]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#2A3235]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#2A3235]" />
                <span className={`${M} ml-3 text-[11.5px] text-[#8C9598]`}>app.ngfsystems.com / website</span>
              </div>
              <div className="grid grid-cols-[236px_1fr] text-left">
                <aside className="border-r border-[#242B2E] bg-[#161B1D]/60 p-4">
                  <p className={`${M} text-[10.5px] uppercase tracking-widest text-[#8C9598]`}>Sections</p>
                  <div className="mt-3 space-y-1.5">
                    <div className="rounded-md bg-[#5E8B87]/20 px-3 py-2 text-[13px] font-medium">Hero</div>
                    <div className="px-3 py-2 text-[13px] text-[#8C9598]">Services</div>
                    <div className="px-3 py-2 text-[13px] text-[#8C9598]">Gallery</div>
                    <div className="px-3 py-2 text-[13px] text-[#8C9598]">Contact</div>
                  </div>
                  <p className={`${M} mt-6 text-[10.5px] uppercase tracking-widest text-[#8C9598]`}>Pending</p>
                  <div className="mt-3 rounded-lg border border-[#242B2E] bg-[#0F1214]/60 p-3">
                    <p className="text-[12.5px] text-white/80">3 changes</p>
                    <div className={`${M} mt-2 grid h-8 place-items-center rounded-md bg-[#C2A379]/20 text-[11.5px] text-[#C2A379]`}>
                      Publish
                    </div>
                  </div>
                </aside>
                <div className="bg-[#0F1214]/70 p-5">
                  <div className="rounded-lg border border-dashed border-[#5E8B87]/60 bg-[#5E8B87]/[0.07] p-5">
                    <p className={`${M} text-[10.5px] uppercase tracking-widest text-[#5E8B87]`}>editing · hero.headline</p>
                    <p className="mt-2 text-[22px] font-semibold">Premium window tint in Grand Rapids</p>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="h-24 rounded-lg border border-[#242B2E] bg-[#161B1D]" />
                    <div className="h-24 rounded-lg border border-[#242B2E] bg-[#161B1D]" />
                    <div className="h-24 rounded-lg border border-[#242B2E] bg-[#161B1D]" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="h-2.5 w-3/4 rounded bg-[#242B2E]" />
                    <div className="h-2.5 w-2/3 rounded bg-[#242B2E]" />
                    <div className="h-2.5 w-1/2 rounded bg-[#242B2E]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* what you get */}
      <section className="border-t border-[#242B2E] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
            <div>
              <p className={`${M} text-[12px] uppercase tracking-widest text-[#5E8B87]`}>{'// what you get'}</p>
              <h2 className="mt-4 text-[40px] font-semibold leading-[1.1] tracking-[-0.02em]">
                Every enquiry, in one place you own.
              </h2>
              <p className="mt-5 text-[16px] leading-relaxed text-[#8C9598]">
                Contact forms on your site do not vanish into a personal inbox. They arrive in your
                portal with a status on each one, and in your email the moment they are submitted.
              </p>
              <ul className="mt-8 space-y-3.5">
                {[
                  'Edit any text or photo on your live site, then publish',
                  'Every enquiry tracked, none lost to a spam folder',
                  'Bookings and orders in the same place, if you sell that way',
                  'Hosting, SSL and backups handled without you asking',
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#C2A379]" />
                    <span className="text-[15px] leading-relaxed text-white/85">{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`${CARD} overflow-hidden rounded-2xl`}>
              <div className="flex items-center justify-between border-b border-[#242B2E] bg-[#161B1D] px-5 py-3.5">
                <span className={`${M} text-[11.5px] uppercase tracking-widest text-[#8C9598]`}>Leads</span>
                <span className={`${M} rounded-md bg-[#5E8B87]/20 px-2 py-1 text-[11px] text-[#7BA39C]`}>4 new</span>
              </div>
              <div className="divide-y divide-[#242B2E]">
                {[
                  ['Dana Whitfield', 'Ceramic tint, full vehicle', 'New', 'bg-[#5E8B87]/20 text-[#7BA39C]'],
                  ['Marcus Webb', 'Quote for storefront film', 'New', 'bg-[#5E8B87]/20 text-[#7BA39C]'],
                  ['Priya Raman', 'Two cars, asked about timing', 'Replied', 'bg-white/[0.07] text-[#8C9598]'],
                  ['Tom Alderman', 'Vinyl wrap, colour samples', 'Won', 'bg-[#C2A379]/20 text-[#C2A379]'],
                ].map(([name, note, status, chip]) => (
                  <div key={name} className="flex items-center justify-between gap-4 px-5 py-4">
                    <div className="min-w-0">
                      <p className="truncate text-[14.5px] font-medium">{name}</p>
                      <p className="mt-0.5 truncate text-[13px] text-[#8C9598]">{note}</p>
                    </div>
                    <span className={`${M} shrink-0 rounded-md px-2.5 py-1 text-[11px] ${chip}`}>{status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* work */}
      <section className="border-t border-[#242B2E] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between">
            <div>
              <p className={`${M} text-[12px] uppercase tracking-widest text-[#5E8B87]`}>{'// recent work'}</p>
              <h2 className="mt-4 text-[40px] font-semibold tracking-[-0.02em]">Every one of these is live.</h2>
            </div>
            <span className={`${M} text-[12.5px] text-[#8C9598]`}>view all →</span>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ['automotive', 'West Michigan Window Tint', 'westmiwindowtint.com', 'from-[#1C2426]'],
              ['rentals', 'Square K Vacations', 'squarekvacations.com', 'from-[#22262A]'],
              ['retail', 'NOMA Fine Jewelry', 'noelleandmary.com', 'from-[#1E2428]'],
            ].map(([tag, name, url, grad]) => (
              <div key={name as string} className={`${CARD} overflow-hidden rounded-xl`}>
                <div className={`h-40 bg-gradient-to-br ${grad as string} to-[#12171A]`} />
                <div className="p-5">
                  <p className={`${M} text-[11px] uppercase tracking-widest text-[#C2A379]`}>{tag as string}</p>
                  <h3 className="mt-2.5 text-[17px] font-semibold">{name as string}</h3>
                  <p className="mt-2 text-[13.5px] text-[#8C9598]">{url as string}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* pricing */}
      <section className="border-t border-[#242B2E] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className={`${M} text-[12px] uppercase tracking-widest text-[#5E8B87]`}>{'// pricing'}</p>
          <h2 className="mt-4 max-w-3xl text-[40px] font-semibold leading-[1.1] tracking-[-0.02em]">
            Priced by what the site does. Never by page count.
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-[1fr_1fr_1.2fr]">
            <div className={`${CARD} rounded-xl p-6`}>
              <p className={`${M} text-[11px] uppercase tracking-widest text-[#8C9598]`}>monthly</p>
              <p className="mt-4 text-[44px] font-semibold tracking-tight">
                $100<span className="text-[17px] text-[#8C9598]">/mo</span>
              </p>
              <p className="mt-3 text-[13.5px] text-[#8C9598]">We own and run it. Cancel any time.</p>
            </div>
            <div className={`${CARD} rounded-xl p-6`}>
              <p className={`${M} text-[11px] uppercase tracking-widest text-[#8C9598]`}>one-time</p>
              <p className="mt-4 text-[44px] font-semibold tracking-tight">$600</p>
              <p className="mt-3 text-[13.5px] text-[#8C9598]">You own the code outright.</p>
            </div>
            <div className="rounded-xl border border-[#5E8B87]/40 bg-[#5E8B87]/[0.08] p-6">
              <p className={`${M} text-[11px] uppercase tracking-widest text-[#5E8B87]`}>add modules</p>
              <div className="mt-4 space-y-2.5">
                {[['Online booking', '+$50/mo', true], ['Online store', '+$75/mo', true], ['Customer accounts', 'quoted', false]].map(
                  ([l, v, acc]) => (
                    <div key={l as string} className="flex items-center justify-between rounded-lg border border-[#242B2E] bg-[#0F1214]/50 px-3.5 py-2.5">
                      <span className="text-[13.5px]">{l as string}</span>
                      <span className={`${M} text-[12.5px] ${acc ? 'text-[#C2A379]' : 'text-[#8C9598]'}`}>{v as string}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
