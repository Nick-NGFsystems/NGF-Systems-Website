import { Bricolage_Grotesque, Public_Sans } from 'next/font/google'

const display = Bricolage_Grotesque({ subsets: ['latin'], weight: ['500', '600', '700', '800'], variable: '--d' })
const body = Public_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--b' })

const D = 'font-[family-name:var(--d)]'

export default function DirectionC() {
  return (
    <div
      className={`${display.variable} ${body.variable} font-[family-name:var(--b)] fixed inset-0 z-[100] overflow-y-auto bg-[#FFFCF5] text-[#12100E] antialiased`}
    >
      {/* nav */}
      <header className="sticky top-0 z-50 bg-[#FFFCF5]/95 backdrop-blur">
        <nav className="mx-auto flex h-[74px] max-w-[1240px] items-center justify-between px-7">
          <div className="flex items-center gap-2.5">
            <div className={`${D} grid h-9 w-9 place-items-center rounded-xl bg-[#0B3D2E] text-[16px] font-bold text-[#F2C744]`}>N</div>
            <span className={`${D} text-[19px] font-bold tracking-tight`}>NGF Systems</span>
          </div>
          <ul className="hidden items-center gap-8 text-[15px] font-medium md:flex">
            <li>Services</li><li>Work</li><li>Pricing</li><li>About</li>
          </ul>
          <div className="flex items-center gap-4">
            <span className="hidden text-[15px] font-medium text-[#12100E]/60 md:block">Client login</span>
            <span className="rounded-full bg-[#0B3D2E] px-6 py-3 text-[14.5px] font-bold text-[#FFFCF5]">
              Get a free mockup
            </span>
          </div>
        </nav>
      </header>

      {/* hero */}
      <section className="mx-auto max-w-[1240px] px-7 pt-14 pb-12">
        <div className="overflow-hidden rounded-[36px] bg-[#0B3D2E] px-10 py-16 text-[#FFFCF5] md:px-16 md:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#F2C744]/20 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-[#F2C744]" />
                <span className="text-[13.5px] font-semibold text-[#F2C744]">West Michigan · 6 sites live</span>
              </div>
              <h1 className={`${D} mt-7 text-[68px] font-bold leading-[0.98] tracking-[-0.03em]`}>
                A website that
                <br />
                works as hard
                <br />
                as <span className="text-[#F2C744]">you do.</span>
              </h1>
              <p className="mt-7 max-w-lg text-[18px] leading-[1.65] text-[#FFFCF5]/75">
                We build it, host it, and hand you the keys — change your own prices, hours and
                photos any time. No agency retainer. No ticket queue. One person, who picks up the
                phone.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <span className="rounded-full bg-[#F2C744] px-8 py-4 text-[15px] font-bold text-[#12100E]">
                  Get a free mockup
                </span>
                <span className="rounded-full border-2 border-[#FFFCF5]/25 px-8 py-4 text-[15px] font-bold">
                  See our work
                </span>
              </div>
              <p className="mt-6 text-[14.5px] text-[#FFFCF5]/55">You see the design before you pay a cent.</p>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl bg-[#FFFCF5] p-6 text-[#12100E]">
                <p className="text-[13px] font-bold uppercase tracking-wider text-[#E4572E]">Your portal</p>
                <p className={`${D} mt-3 text-[21px] font-semibold leading-snug`}>
                  Change a price in 10 seconds, not 10 days.
                </p>
                <div className="mt-5 space-y-2.5">
                  {[['New enquiries', '4', 'bg-[#E4572E] text-[#FFFCF5]'], ['Bookings this week', '11', 'bg-[#0B3D2E] text-[#FFFCF5]'], ['Draft changes', '3', 'bg-[#F2C744] text-[#12100E]']].map(([l, n, c]) => (
                    <div key={l} className="flex items-center justify-between rounded-xl bg-[#12100E]/[0.05] px-4 py-3">
                      <span className="text-[14px] font-semibold">{l}</span>
                      <span className={`rounded-full px-2.5 py-1 text-[12px] font-bold ${c}`}>{n}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl bg-[#F2C744] p-6 text-[#12100E]">
                <p className={`${D} text-[36px] font-bold leading-none`}>
                  $100<span className="text-[17px]">/mo</span>
                </p>
                <p className="mt-2 text-[14.5px] font-semibold">Everything included. Cancel any time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* pillars */}
      <section className="mx-auto max-w-[1240px] px-7 py-16">
        <h2 className={`${D} max-w-3xl text-[46px] font-bold leading-[1.05] tracking-[-0.025em]`}>
          Most web companies do one of these. We do all three.
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            ['1', 'We build it', 'Custom designed around how you actually sell. No themes. Fast on a phone, easy to find on Google.', 'bg-[#0B3D2E] text-[#FFFCF5]', 'bg-[#12100E]/[0.04]', 'text-[#12100E]/65'],
            ['2', 'We run it', "Hosting, security and backups are ours. If it breaks at 2am, it's our problem — not yours.", 'bg-[#E4572E] text-[#FFFCF5]', 'bg-[#12100E]/[0.04]', 'text-[#12100E]/65'],
            ['3', 'You control it', 'Edit your own text and photos whenever you want. Every enquiry, invoice and booking in one place.', 'bg-[#12100E] text-[#F2C744]', 'bg-[#F2C744]', 'text-[#12100E]/75'],
          ].map(([n, t, b, chip, bg, tone]) => (
            <div key={n} className={`rounded-[28px] ${bg} p-8`}>
              <div className={`${D} grid h-14 w-14 place-items-center rounded-2xl text-[20px] font-bold ${chip}`}>{n}</div>
              <h3 className={`${D} mt-6 text-[24px] font-bold`}>{t}</h3>
              <p className={`mt-3 text-[15.5px] leading-[1.65] ${tone}`}>{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* work */}
      <section className="mx-auto max-w-[1240px] px-7 py-16">
        <div className="flex items-end justify-between">
          <h2 className={`${D} text-[46px] font-bold tracking-[-0.025em]`}>Real businesses. Live today.</h2>
          <span className="rounded-full border-2 border-[#12100E] px-6 py-3 text-[14.5px] font-bold">See all six</span>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            ['Automotive', 'West Michigan Window Tint', 'westmiwindowtint.com', 'bg-[#0B3D2E]', 'bg-[#E4572E]/15 text-[#E4572E]'],
            ['Rentals', 'Square K Vacations', 'squarekvacations.com', 'bg-[#E4572E]', 'bg-[#0B3D2E]/15 text-[#0B3D2E]'],
            ['Retail', 'NOMA Fine Jewelry', 'noelleandmary.com', 'bg-[#F2C744]', 'bg-[#0B3D2E]/15 text-[#0B3D2E]'],
          ].map(([tag, name, url, swatch, chip]) => (
            <div key={name} className="overflow-hidden rounded-[28px] bg-[#12100E]/[0.04]">
              <div className={`h-44 ${swatch}`} />
              <div className="p-6">
                <span className={`rounded-full px-3 py-1 text-[12.5px] font-bold ${chip}`}>{tag}</span>
                <h3 className={`${D} mt-4 text-[21px] font-bold leading-snug`}>{name}</h3>
                <p className="mt-2 text-[14.5px] font-semibold text-[#12100E]/55">{url}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* pricing */}
      <section className="mx-auto max-w-[1240px] px-7 py-16">
        <div className="rounded-[36px] bg-[#12100E] p-10 text-[#FFFCF5] md:p-16">
          <h2 className={`${D} max-w-2xl text-[46px] font-bold leading-[1.05] tracking-[-0.025em]`}>
            Priced by what it does — not how many pages it has.
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <div className="rounded-[24px] bg-[#FFFCF5]/[0.07] p-7">
              <p className="text-[13px] font-bold uppercase tracking-wider text-[#F2C744]">Monthly</p>
              <p className={`${D} mt-4 text-[46px] font-bold leading-none`}>
                $100<span className="text-[17px] text-[#FFFCF5]/50">/mo</span>
              </p>
              <p className="mt-4 text-[15px] text-[#FFFCF5]/65">We own and run it. Cancel any time.</p>
            </div>
            <div className="rounded-[24px] bg-[#FFFCF5]/[0.07] p-7">
              <p className="text-[13px] font-bold uppercase tracking-wider text-[#F2C744]">One-time</p>
              <p className={`${D} mt-4 text-[46px] font-bold leading-none`}>$600</p>
              <p className="mt-4 text-[15px] text-[#FFFCF5]/65">You own the code outright.</p>
            </div>
            <div className="rounded-[24px] bg-[#F2C744] p-7 text-[#12100E]">
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
