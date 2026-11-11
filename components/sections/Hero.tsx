import Link from 'next/link'
import ScreenshotSlot from '@/components/ui/ScreenshotSlot'
import type { NgfSiteContent } from '@/lib/ngf'

/**
 * Centred statement over one graphite panel, with the product underneath it.
 *
 * The panel is deep on purpose. The glass nav floats over this, and glass
 * needs something worth refracting — over a pale ground it renders as grey
 * mush however good the filter is. One dark band near the top, light
 * everywhere else, so the screenshots are the only colour that matters.
 *
 * The frosted pills sit ON the screenshot. That is the one place on the whole
 * site where translucency is over real content, which is the only place it
 * means anything.
 */
export default function Hero({ ngf }: { ngf?: NgfSiteContent }) {
  const headline = ngf?.hero?.headline || 'Your website, and one place to run it from.'
  const subheadline =
    ngf?.hero?.subheadline ||
    'We design and build the site, host it, and give you a portal where you change your own words and pictures, read every enquiry and take bookings.'

  return (
    // Full-bleed on a phone, a card from 640px up. With a side gutter the
    // dark panel read as a frame inside the frame of the branding strip, and
    // a rounded card jammed flush under that strip looked like a mistake
    // rather than a choice. Edge to edge the dark band simply IS the top of
    // the page, and the curve at its foot is where it hands over to the white
    // content below.
    <section className="sm:px-7">
      <div className="mx-auto max-w-[1280px] overflow-hidden rounded-b-[28px] bg-well px-5 pt-14 text-center sm:rounded-[34px] sm:px-8 lg:pt-24">
        <h1
          data-ngf-field="hero.headline"
          data-ngf-label="Headline"
          data-ngf-type="text"
          data-ngf-section="Hero"
          className="mx-auto max-w-[15em] text-[38px] font-medium leading-[1.04] tracking-[-0.042em] text-white sm:text-[54px] lg:text-[72px] lg:leading-[1.03] lg:tracking-[-0.046em]"
        >
          {headline}
        </h1>

        <p
          data-ngf-field="hero.subheadline"
          data-ngf-label="Opening paragraph"
          data-ngf-type="text"
          data-ngf-section="Hero"
          className="mx-auto mt-6 max-w-[31em] text-[16.5px] leading-[1.55] tracking-[-0.013em] text-onwell sm:text-[20px] lg:mt-7"
        >
          {subheadline}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 lg:mt-9">
          <Link
            href="/contact?intent=Free%20mockup"
            className="inline-flex h-[54px] items-center rounded-full bg-white px-8 text-[17px] font-medium tracking-[-0.012em] text-head transition-colors hover:bg-onwell"
          >
            Get a free mockup
          </Link>
          <Link
            href="/services"
            className="inline-flex h-[54px] items-center rounded-full px-6 text-[17px] tracking-[-0.012em] text-white transition-colors hover:text-onwell"
          >
            Look inside the portal &rsaquo;
          </Link>
        </div>

        <p className="mt-5 text-[14.5px] text-onwell-dim">
          Free. You see the design before you pay anything.
        </p>

        {/* The product, bleeding off the bottom of the panel. */}
        <div className="relative mx-auto mt-12 max-w-[1040px] lg:mt-[60px]">
          <div className="overflow-hidden rounded-t-[18px] shadow-[inset_0_0_0_1px_rgba(255,255,255,.10)]">
            <div className="h-[260px] sm:h-[360px] lg:h-[430px]">
              <ScreenshotSlot shot="editor" tone="dark" priority />
            </div>
          </div>

          <ul className="absolute inset-x-0 bottom-5 hidden flex-wrap justify-center gap-2.5 sm:flex lg:bottom-[26px]">
            {[
              'Click any text to change it',
              'Preview before it goes live',
              'Every version saved',
            ].map((line) => (
              <li
                key={line}
                className="glass glass-pill rounded-full px-[22px] py-3 text-[14.5px] font-medium text-head"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
