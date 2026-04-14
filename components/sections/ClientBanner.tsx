import Link from 'next/link'
import type { NgfSiteContent } from '@/lib/ngf'

export default function ClientBanner({ ngf }: { ngf?: NgfSiteContent }) {
  const bannerHeadline = ngf?.clientbanner?.headline || 'Already an NGF Systems client?'
  const bannerSubheadline = ngf?.clientbanner?.subheadline || 'Access your client portal to manage your website, submit requests, and view invoices.'
  return (
    <section className="bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 py-12 px-5">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <p data-ngf-field="clientbanner.headline" className="font-sora font-semibold text-lg text-slate-900 dark:text-white mb-1">
            {bannerHeadline}
          </p>
          <p data-ngf-field="clientbanner.subheadline" className="text-sm text-slate-500 dark:text-slate-400 font-inter">
            {bannerSubheadline}
          </p>
        </div>
        <Link
          href="https://app.ngfsystems.com"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-sm px-6 py-3 rounded-xl transition-all hover:shadow-md font-inter group"
        >
          Sign in to your portal
          <span className="group-hover:translate-x-0.5 transition-transform">→</span>
        </Link>
      </div>
    </section>
  )
}
