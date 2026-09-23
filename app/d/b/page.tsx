import { Fraunces, Work_Sans } from 'next/font/google'

const display = Fraunces({ subsets: ['latin'], weight: ['300', '400', '500'], style: ['normal', 'italic'], variable: '--d' })
const body = Work_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--b' })

const D = 'font-[family-name:var(--d)]'
const RULE = 'border-[#D8D1C4]'

export default function DirectionB() {
  return (
    <div
      className={`${display.variable} ${body.variable} font-[family-name:var(--b)] fixed inset-0 z-[100] overflow-y-auto bg-[#F5F2EC] text-[#16130F] antialiased`}
    >
      {/* nav */}
      <header className={`border-b ${RULE}`}>
        <nav className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-8">
          <span className={`${D} text-[22px] font-medium tracking-tight`}>NGF Systems</span>
          <ul className="hidden items-center gap-9 text-[14px] tracking-wide md:flex">
            <li>Services</li><li>Work</li><li>Pricing</li><li>About</li>
          </ul>
          <div className="flex items-center gap-6">
            <span className="hidden text-[14px] text-[#5C544A] md:block">Client login</span>
            <span className="border-b-2 border-[#9C5238] pb-0.5 text-[14px] font-medium text-[#9C5238]">
              Get a free mockup
            </span>
          </div>
        </nav>
      </header>

      {/* hero */}
      <section className="mx-auto max-w-[1200px] px-8 pt-24 pb-20">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-9">
            <p className="mb-8 text-[13px] uppercase tracking-[0.22em] text-[#9C5238]">
              Hudsonville, Michigan · Est. 2024
            </p>
            <h1 className={`${D} text-[86px] font-light leading-[0.95] tracking-[-0.025em]`}>
              Websites for
              <br />
              <span className="italic font-normal">small businesses</span>
              <br />
              that someone
              <br />
              actually looks after.
            </h1>
          </div>
          <div className="col-span-12 flex flex-col justify-end lg:col-span-3">
            <p className="text-[16px] leading-[1.7] text-[#5C544A]">
              We design it, host it, and give you a portal to change your own words and pictures.
              One person builds it. You always know who to call.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <span className="bg-[#16130F] px-6 py-4 text-center text-[14px] font-medium text-[#F5F2EC]">
                Get a free mockup
              </span>
              <span className="border border-[#16130F] px-6 py-4 text-center text-[14px] font-medium">
                See the work
              </span>
            </div>
          </div>
        </div>

        <div className={`mt-24 grid grid-cols-12 gap-8 border-t ${RULE} pt-8`}>
          {[['06', 'Live client sites'], ['06', 'Industries'], ['01', 'Person you call']].map(([n, l]) => (
            <div key={l} className="col-span-4 md:col-span-3">
              <p className={`${D} text-[52px] font-light leading-none`}>{n}</p>
              <p className="mt-2 text-[13px] uppercase tracking-[0.16em] text-[#5C544A]">{l}</p>
            </div>
          ))}
          <div className="col-span-12 flex items-end md:col-span-3">
            <p className="text-[14px] leading-relaxed text-[#5C544A]">
              A mockup of your real site, before you pay anything.
            </p>
          </div>
        </div>
      </section>

      {/* what you get */}
      <section className="bg-[#EBE6DC] py-24">
        <div className="mx-auto max-w-[1200px] px-8">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-5">
              <p className="text-[13px] uppercase tracking-[0.22em] text-[#9C5238]">What you get</p>
              <h2 className={`${D} mt-5 text-[46px] font-light leading-[1.05] tracking-[-0.02em]`}>
                Every enquiry, in
                <br />
                one place you own.
              </h2>
              <p className="mt-6 max-w-sm text-[16px] leading-[1.75] text-[#5C544A]">
                Contact forms on your site do not vanish into a personal inbox. They arrive in your
                portal with a status on each one, and in your email the moment they are sent.
              </p>
            </div>

            <div className="col-span-12 lg:col-span-7">
              <div className={`border-t ${RULE}`}>
                {[
                  ['Dana Whitfield', 'Ceramic tint, full vehicle', 'New'],
                  ['Marcus Webb', 'Quote for storefront film', 'New'],
                  ['Priya Raman', 'Two cars, asked about timing', 'Replied'],
                  ['Tom Alderman', 'Vinyl wrap, colour samples', 'Won'],
                ].map(([name, note, status]) => (
                  <div key={name} className={`flex items-baseline justify-between gap-6 border-b ${RULE} py-5`}>
                    <div>
                      <p className={`${D} text-[20px] font-normal`}>{name}</p>
                      <p className="mt-1 text-[14px] text-[#5C544A]">{note}</p>
                    </div>
                    <span className="shrink-0 text-[12px] uppercase tracking-[0.16em] text-[#9C5238]">{status}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[14px] leading-relaxed text-[#5C544A]">
                Alongside them: edit any text or photo on your live site and publish it yourself, and
                take bookings or orders in the same place if you sell that way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* work */}
      <section className="py-24">
        <div className="mx-auto max-w-[1200px] px-8">
          <div className={`flex items-baseline justify-between border-b ${RULE} pb-6`}>
            <h2 className={`${D} text-[46px] font-light tracking-[-0.02em]`}>Selected work</h2>
            <span className="text-[14px] text-[#9C5238]">All six →</span>
          </div>
          <div className="mt-12 grid gap-12 md:grid-cols-2">
            <article>
              <div className="aspect-[4/3] bg-[#DED7C9]" />
              <div className="mt-5 flex items-baseline justify-between">
                <h3 className={`${D} text-[26px] font-normal`}>West Michigan Window Tint</h3>
                <span className="text-[12px] uppercase tracking-[0.16em] text-[#5C544A]">2025</span>
              </div>
              <p className="mt-2 text-[15px] leading-relaxed text-[#5C544A]">
                A shop whose work is entirely visual, whose diary was run by phone.
              </p>
              <p className="mt-3 text-[14px] text-[#9C5238]">westmiwindowtint.com</p>
            </article>
            <article className="md:mt-20">
              <div className="aspect-[4/3] bg-[#D6CFC0]" />
              <div className="mt-5 flex items-baseline justify-between">
                <h3 className={`${D} text-[26px] font-normal`}>Square K Vacations</h3>
                <span className="text-[12px] uppercase tracking-[0.16em] text-[#5C544A]">2025</span>
              </div>
              <p className="mt-2 text-[15px] leading-relaxed text-[#5C544A]">
                Three properties that each needed to sell themselves, without a marketplace cut.
              </p>
              <p className="mt-3 text-[14px] text-[#9C5238]">squarekvacations.com</p>
            </article>
          </div>
        </div>
      </section>

      {/* pricing */}
      <section className={`border-t ${RULE} py-24`}>
        <div className="mx-auto max-w-[1200px] px-8">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-5">
              <p className="text-[13px] uppercase tracking-[0.22em] text-[#9C5238]">Pricing</p>
              <h2 className={`${D} mt-5 text-[46px] font-light leading-[1.05] tracking-[-0.02em]`}>
                Priced by what
                <br />
                it does, never
                <br />
                by page count.
              </h2>
              <p className="mt-6 max-w-sm text-[16px] leading-[1.75] text-[#5C544A]">
                A three-page site that takes bookings is more work than a nine-page brochure. So that
                is what you pay for.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-7">
              {[
                ['Monthly plan', 'We own and run it. Cancel any time.', '$100', '/mo', false],
                ['One-time build', 'You own the code outright.', '$600', '', false],
                ['Online booking', 'Customers book themselves.', '+$50', '/mo', true],
                ['Online store', 'Sell direct, keep the margin.', '+$75', '/mo', true],
              ].map(([t, s, p, suf, acc], i, arr) => (
                <div
                  key={t as string}
                  className={`flex items-baseline justify-between py-6 ${i < arr.length - 1 ? `border-b ${RULE}` : ''}`}
                >
                  <div>
                    <p className={`${D} text-[26px] font-normal`}>{t as string}</p>
                    <p className="mt-1 text-[14px] text-[#5C544A]">{s as string}</p>
                  </div>
                  <p className={`${D} text-[40px] font-light ${acc ? 'text-[#9C5238]' : ''}`}>
                    {p as string}
                    <span className="text-[16px] text-[#5C544A]">{suf as string}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
