import Link from 'next/link'
import type { NgfSiteContent } from '@/lib/ngf'
import { NAV, PORTAL_URL, CONTACT } from '@/lib/nav'

/**
 * A landing page stops at the last call to action. A business has a footer
 * with a name, a place and a way to reach a person.
 */
export default function Footer({ ngf }: { ngf?: NgfSiteContent }) {
  const location = ngf?.footer?.location || CONTACT.location
  const blurb =
    ngf?.footer?.blurb ||
    'We build, host and look after websites for small businesses — with a portal you run yourself.'

  return (
    <footer className="border-t border-line bg-well">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="max-w-sm lg:col-span-2">
            <p className="text-[17px] font-semibold tracking-tight text-white">
              NGF<span className="text-sand"> Systems</span>
            </p>
            <p
              data-ngf-field="footer.blurb"
              data-ngf-label="Footer blurb"
              data-ngf-type="textarea"
              data-ngf-section="Footer"
              className="mt-3 text-[14.5px] leading-relaxed text-muted"
            >
              {blurb}
            </p>
            <p
              data-ngf-field="footer.location"
              data-ngf-label="Location"
              data-ngf-type="text"
              data-ngf-section="Footer"
              className="mt-4 text-[14px] text-dim"
            >
              {location}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-white">
              Pages
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[14.5px] text-muted transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-white">
              Get in touch
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="break-all text-[14.5px] text-muted transition-colors hover:text-white"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="text-[14.5px] text-muted transition-colors hover:text-white"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li className="pt-1">
                <Link
                  href={PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14.5px] font-medium text-accent-light hover:underline underline-offset-4"
                >
                  Client login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <p className="text-[13px] text-dim">
            © {new Date().getFullYear()} NGF Systems LLC. Serving {CONTACT.serviceArea}.
          </p>
        </div>
      </div>
    </footer>
  )
}
