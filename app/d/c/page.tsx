import { Bricolage_Grotesque, Public_Sans } from 'next/font/google'

const display = Bricolage_Grotesque({ subsets: ['latin'], weight: ['500', '600', '700', '800'], variable: '--d' })
const body = Public_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--b' })

const D = 'font-[family-name:var(--d)]'

export default function DirectionC() {
  return (
    <div
      className={`${display.variable} ${body.variable} font-[family-name:var(--b)] fixed inset-0 z-[100] overflow-y-auto bg-[#FAF7F0] text-[#1A1815] antialiased`}
    >
      {/* nav */}
      <header className="sticky top-0 z-50 bg-[#FAF7F0]/95 backdrop-blur">
        <nav className="mx-auto flex h-[74px] max-w-[1240px] items-center justify-between px-7">
          <div className="flex items-center gap-2.5">
            <div className={`${D} grid h-9 w-9 place-items-center rounded-xl bg-[#2C4A3E] text-[16px] font-bold text-[#D4B072]`}>N</div>
            <span className={`${D} text-[19px] font-bold tracking-tight`}>NGF Systems</span>
          </div>
          <ul className="hidden items-center gap-8 text-[15px] font-medium md:flex">
            <li>Services</li><li>Work</li><li>Pricing</li><li>About</li>
          </ul>
          <div className="flex items-center gap-4">
            <span className="hidden text-[15px] font-medium text-[#1A1815]/60 md:block">Client login</span>
            <span className="rounded-full bg-[#2C4A3E] px-6 py-3 text-[14.5px] font-bold text-[#FAF7F0]">
              Get a free mockup
            </span>
          </div>
        </nav>
      </header>

      {/* hero */}
      <section className="mx-auto max-w-[1240px] px-7 pt-14 pb-12">
        <div className="overflow-hidden rounded-[36px] bg-[#2C4A3E] px-10 py-16 text-[#FAF7F0] md:px-16 md:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#D4B072]/20 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-[#D4B072]" />
                <span className="text-[13.5px] font-semibold text-[#D4B072]">West Michigan · 6 sites live</span>
              </div>
              <h1 className={`${D} mt-7 text-[68px] font-bold leading-[0.98] tracking-[-0.03em]`}>
                A website that
                <br />
                works as hard
                <br />
                as <span className="text-[#D4B072]">you do.</span>
              </h1>
              <p className="mt-7 max-w-lg text-[18px] leading-[1.65] text-[#FAF7F0]/75">
                We build it, host it, and hand you the keys — change your own prices, hours and
                photos any time. No agency retainer. No ticket queue. One person, who picks up the
                phone.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <span className="rounded-full bg-[#D4B072] px-8 py-4 text-[15px] font-bold text-[#1A1815]">
                  Get a free mockup
                </span>
                <span className="rounded-full border-2 border-[#FAF7F0]/25 px-8 py-4 text-[15px] font-bold">
                  See our work
                </span>
              </div>
              <p className="mt-6 text-[14.5px] text-[#FAF7F0]/55">You see the design before you pay a cent.</p>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl bg-[#FAF7F0] p-6 text-[#1A1815]">
                <p className="text-[13px] font-bold uppercase tracking-wider text-[#A8573E]">Your portal</p>
                <p className={`${D} mt-3 text-[21px] font-semibold leading-snug`}>
                  Change a price in 10 seconds, not 10 days.
                </p>
                <div className="mt-5 space-y-2.5">
                  {[['New enquiries', '4', 'bg-[#A8573E] text-[#FAF7F0]'], ['Bookings this week', '11', 'bg-[#2C4A3E] text-[#FAF7F0]'], ['Draft changes', '3', 'bg-[#D4B072] text-[#1A1815]']].map(([l, n, c]) => (
                    <div key={l} className="flex items-center justify-between rounded-xl bg-[#1A1815]/[0.05] px-4 py-3">
                      <span className="text-[14px] font-semibold">{l}</span>
                      <span className={`rounded-full px-2.5 py-1 text-[12px] font-bold ${c}`}>{n}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl bg-[#D4B072] p-6 text-[#1A1815]">
                <p className={`${D} text-[36px] font-bold leading-none`}>
                  $100<span className="text-[17px]">/mo</span>
                </p>
                <p className="mt-2 text-[14.5px] font-semibold">Everything included. Cancel any time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* what you get */}
      <section className="mx-auto max-w-[1240px] px-7 py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 className={`${D} text-[46px] font-bold leading-[1.05] tracking-[-0.025em]`}>
              Every enquiry, in one place you own.
            </h2>
            <p className="mt-6 text-[17px] leading-[1.7] text-[#1A1815]/65">
              Contact forms on your site do not vanish into a personal inbox. They land in your
              portal with a status on each one, and in your email the moment they are sent.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                'Edit any text or photo on your live site, then publish',
                'Every enquiry tracked, none lost to a spam folder',
                'Bookings and orders in the same place, if you sell that way',
                'Hosting, SSL and backups handled without you asking',
              ].map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#A8573E]" />
                  <span className="text-[16px] leading-relaxed text-[#1A1815]/80">{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-[28px] bg-[#1A1815]/[0.04]">
            <div className="flex items-center justify-between px-7 pt-7">
              <p className="text-[13px] font-bold uppercase tracking-wider text-[#A8573E]">Your leads</p>
              <span className="rounded-full bg-[#2C4A3E] px-3 py-1 text-[12.5px] font-bold text-[#FAF7F0]">4 new</span>
            </div>
            <div className="mt-5 space-y-2.5 px-5 pb-7">
              {[
                ['Dana Whitfield', 'Ceramic tint, full vehicle', 'New', 'bg-[#2C4A3E] text-[#FAF7F0]'],
                ['Marcus Webb', 'Quote for storefront film', 'New', 'bg-[#2C4A3E] text-[#FAF7F0]'],
                ['Priya Raman', 'Two cars, asked about timing', 'Replied', 'bg-[#1A1815]/10 text-[#1A1815]/70'],
                ['Tom Alderman', 'Vinyl wrap, colour samples', 'Won', 'bg-[#D4B072] text-[#1A1815]'],
              ].map(([name, note, status, chip]) => (
                <div key={name} className="flex items-center justify-between gap-4 rounded-2xl bg-[#FAF7F0] px-5 py-4">
                  <div className="min-w-0">
                    <p className="truncate text-[15px] font-bold">{name}</p>
                    <p className="mt-0.5 truncate text-[13.5px] text-[#1A1815]/55">{note}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-3 py-1 text-[12px] font-bold ${chip}`}>{status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* work */}
      <section className="mx-auto max-w-[1240px] px-7 py-16">
        <div className="flex items-end justify-between">
          <h2 className={`${D} text-[46px] font-bold tracking-[-0.025em]`}>Real businesses. Live today.</h2>
          <span className="rounded-full border-2 border-[#1A1815] px-6 py-3 text-[14.5px] font-bold">See all six</span>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            ['Automotive', 'West Michigan Window Tint', 'westmiwindowtint.com', 'bg-[#2C4A3E]', 'bg-[#A8573E]/15 text-[#A8573E]'],
            ['Rentals', 'Square K Vacations', 'squarekvacations.com', 'bg-[#A8573E]', 'bg-[#2C4A3E]/15 text-[#2C4A3E]'],
            ['Retail', 'NOMA Fine Jewelry', 'noelleandmary.com', 'bg-[#D4B072]', 'bg-[#2C4A3E]/15 text-[#2C4A3E]'],
          ].map(([tag, name, url, swatch, chip]) => (
            <div key={name} className="overflow-hidden rounded-[28px] bg-[#1A1815]/[0.04]">
              <div className={`h-44 ${swatch}`} />
              <div className="p-6">
                <span className={`rounded-full px-3 py-1 text-[12.5px] font-bold ${chip}`}>{tag}</span>
                <h3 className={`${D} mt-4 text-[21px] font-bold leading-snug`}>{name}</h3>
                <p className="mt-2 text-[14.5px] font-semibold text-[#1A1815]/55">{url}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* pricing */}
      <section className="mx-auto max-w-[1240px] px-7 py-16">
        <div className="rounded-[36px] bg-[#1A1815] p-10 text-[#FAF7F0] md:p-16">
          <h2 className={`${D} max-w-2xl text-[46px] font-bold leading-[1.05] tracking-[-0.025em]`}>
            Priced by what it does — not how many pages it has.
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <div className="rounded-[24px] bg-[#FAF7F0]/[0.07] p-7">
              <p className="text-[13px] font-bold uppercase tracking-wider text-[#D4B072]">Monthly</p>
              <p className={`${D} mt-4 text-[46px] font-bold leading-none`}>
                $100<span className="text-[17px] text-[#FAF7F0]/50">/mo</span>
              </p>
              <p className="mt-4 text-[15px] text-[#FAF7F0]/65">We own and run it. Cancel any time.</p>
            </div>
            <div className="rounded-[24px] bg-[#FAF7F0]/[0.07] p-7">
              <p className="text-[13px] font-bold uppercase tracking-wider text-[#D4B072]">One-time</p>
              <p className={`${D} mt-4 text-[46px] font-bold leading-none`}>$600</p>
              <p className="mt-4 text-[15px] text-[#FAF7F0]/65">You own the code outright.</p>
            </div>
            <div className="rounded-[24px] bg-[#D4B072] p-7 text-[#1A1815]">
              <p className="text-[13px] font-bold uppercase tracking-wider">Add on</p>
              <div className="mt-4 space-y-2.5">
                {[['Booking', '+$50'], ['Store', '+$75'], ['Accounts', 'Quote']].map(([l, v]) => (
                  <div key={l} className="flex items-center justify-between">
                    <span className="text-[15px] font-semibold">{l}</span>
                    <span className={`${D} text-[19px] font-bold`}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
