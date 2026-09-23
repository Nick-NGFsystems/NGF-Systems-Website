import Link from 'next/link'
import type { NgfSiteContent } from '@/lib/ngf'
import { NAV, PORTAL_URL, CONTACT } from '@/lib/nav'

export default function Footer({ ngf }: { ngf?: NgfSiteContent }) {
  const location = ngf?.footer?.location || CONTACT.location
  const blurb =
    ngf?.footer?.blurb ||
    'We build and manage websites for small businesses — design, hosting, and a portal you can run yourself.'

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2 max-w-sm">
            <p className="font-sora font-semibold text-lg tracking-tight text-slate-900 dark:text-white">
              NGF<span className="text-blue-600 dark:text-blue-400"> Systems</span>
            </p>
            <p
              data-ngf-field="footer.blurb"
              data-ngf-label="Footer blurb"
              data-ngf-type="textarea"
              data-ngf-section="Footer"
              className="mt-3 font-body text-sm leading-relaxed text-slate-600 dark:text-slate-400"
            >
              {blurb}
            </p>
            <p
              data-ngf-field="footer.location"
              data-ngf-label="Location"
              data-ngf-type="text"
              data-ngf-section="Footer"
              className="mt-4 font-body text-sm text-slate-500 dark:text-slate-500"
            >
              {location}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-body text-xs font-semibold uppercase tracking-[0.12em] text-slate-900 dark:text-white">
              Pages
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-body text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-body text-xs font-semibold uppercase tracking-[0.12em] text-slate-900 dark:text-white">
              Get in touch
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="font-body text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors break-all"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="font-body text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li className="pt-1">
                <Link
                  href={PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline underline-offset-4"
                >
                  Client login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-6">
          <p className="font-body text-xs text-slate-500 dark:text-slate-500">
            © {new Date().getFullYear()} NGF Systems LLC. Serving {CONTACT.serviceArea}.
          </p>
        </div>
      </div>
    </footer>
  )
}
