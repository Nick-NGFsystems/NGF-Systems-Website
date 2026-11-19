'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Icon, { type IconName } from '@/components/ui/Icon'
import { NAV, PORTAL_URL, CONTACT } from '@/lib/nav'

/* ── The phone menu ───────────────────────────────────────────────────────
   `lib/nav.ts` stays the one table of destinations; this adds the two rows
   that only make sense on a phone. Home is one of them: on a desktop the
   wordmark is the way back, and a phone has no wordmark in the menu, so
   there was no way home at all without going back to the top of the page.
   The icons are only here — a desktop nav of six icons would be noise.    */

const MENU_ICONS: Record<string, IconName> = {
  '/services': 'layout',
  '/work': 'grid',
  '/pricing': 'tag',
  '/about': 'users',
  '/contact': 'chat',
}

interface MenuRow {
  href: string
  label: string
  icon: IconName
  /** Opens the portal in a new tab, and is drawn as a quieter row. */
  external?: boolean
}

const MENU: readonly MenuRow[] = [
  { href: '/', label: 'Home', icon: 'home' },
  ...NAV.map((n) => ({ href: n.href, label: n.label, icon: MENU_ICONS[n.href] ?? 'layout' })),
  { href: PORTAL_URL, label: 'Client login', icon: 'external', external: true },
]

/* Written out rather than computed, because Tailwind scans source text: a
   template literal like `delay-[${i * 35}ms]` produces no class at all. */
const STAGGER = [
  'delay-[30ms]',
  'delay-[65ms]',
  'delay-[100ms]',
  'delay-[135ms]',
  'delay-[170ms]',
  'delay-[205ms]',
  'delay-[240ms]',
] as const

/** The sheet unrolls upward out of the button, so the BOTTOM row moves
 *  first: the delay counts back from the end of the list. */
const delayFor = (i: number) => STAGGER[MENU.length - 1 - i] ?? ''

/* ── Geometry ─────────────────────────────────────────────────────────────
   Three glass pills — wordmark / links / actions — sitting at a fixed gap.

   THEY DO NOT REACT TO SCROLL. An earlier version fused them into one bar as
   the page scrolled and pulled them apart again at the top; Nick's call was
   that the nav should hold still while you read. Tuning when the fuse began
   only moved the problem, so the scroll handler is gone rather than delayed.
   Do not reintroduce one.

   What is still animated is WIDTH. The pills are measured from their own
   content, so a link added to lib/nav.ts, or the display face landing after
   first paint, changes how wide they are — and a resize can too, once the
   content inside them reflows. Those changes run through a damped spring per
   pill so the bar flows to its new size instead of snapping. A spring carries
   velocity, so it arrives with momentum and settles; an exponential ease can
   only decelerate into place, which reads as sliding rather than flowing.

   The outline is still drawn as one path per pill rather than three stroked
   divs, because the rim gradient has to run across the whole group.        */

const H = 56
const R = 28
/* Pill widths are MEASURED from the rendered content, never hard-coded.
   lib/nav.ts is the one table of destinations, so a link added there used to
   overflow a fixed 322px pill and spill into the next one. The measuring pass
   runs in useLayoutEffect, i.e. before the browser paints, so it is not a
   visible reflow. */
const PAD = [48, 56, 18] as const // breathing room added to each measured group
const FALLBACK = [168, 400, 292] as const // SSR and the first paint
const STIFF = [240, 212, 196] as const // tuned apart so the three do not move in lockstep
const GAP = 31 // the fixed space between pills. Never animated.
const ZETA = 0.72 // damping ratio: 1 is a dead stop, lower overshoots

interface Pill {
  x: number
  w: number
}

/** Laid out left to right at a fixed gap. The group is centred by the
 *  flex parent, so nothing here has to know the viewport width. */
function layout(w: readonly number[]): Pill[] {
  return [
    { x: 0, w: w[0] },
    { x: w[0] + GAP, w: w[1] },
    { x: w[0] + GAP + w[1] + GAP, w: w[2] },
  ]
}

/** Full width of the group. */
const spanOf = (w: readonly number[]) => w[0] + w[1] + w[2] + 2 * GAP

const n = (v: number) => Math.round(v * 100) / 100

/** One subpath per pill. Three stroked divs would be simpler, but the rim is
 *  a single gradient running across the whole group, which needs one path. */
function outline(pills: Pill[]): string {
  return pills
    .map(
      (p) =>
        `M ${n(p.x + R)} 0 L ${n(p.x + p.w - R)} 0` +
        ` A ${R} ${R} 0 0 1 ${n(p.x + p.w - R)} ${H}` +
        ` L ${n(p.x + R)} ${H}` +
        ` A ${R} ${R} 0 0 1 ${n(p.x + R)} 0 Z`,
    )
    .join(' ')
}

const NAV_LINK = 'text-[14.5px] text-muted transition-colors hover:text-head'

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Navbar() {
  const [shape, setShape] = useState(() => {
    const p = layout(FALLBACK)
    return { d: outline(p), pills: p }
  })
  const [open, setOpen] = useState(false)

  /* The active-page marking is applied AFTER mount, never during the server
     render. `usePathname()` is reliable in the browser but not in whatever
     context an ISR regeneration runs in: the build-time prerender of every
     page marked the right row, and then — once the home page revalidated
     under traffic — the regenerated HTML came back with no row marked at all,
     while pages that had not regenerated yet still looked fine. React 18 does
     not repair attribute mismatches on hydration, so that wrong HTML stuck.
     Deferring to `mounted` makes the server output consistently unmarked and
     lets the client decide, which cannot drift. Nothing flashes, because the
     sheet is closed and invisible until it is tapped. */
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const pathname = usePathname()
  const here = mounted ? pathname : null

  const group = useRef<Array<HTMLElement | null>>([null, null, null])

  /* `shown` is what is on screen and springs toward `want`, which is what
     the content actually measures. */
  const shown = useRef<number[]>([...FALLBACK])
  const want = useRef<number[]>([...FALLBACK])
  const vels = useRef<number[]>([0, 0, 0])
  const raf = useRef(0)
  const last = useRef(0)
  const first = useRef(true)

  const paint = useCallback(() => {
    const p = layout(shown.current)
    setShape({ d: outline(p), pills: p })
  }, [])

  /* Each pill's width is its own damped spring, integrated per frame. This
     is the ONLY thing that animates the bar — there is no scroll input. */
  const tick = useCallback(
    (now: number) => {
      const dt = last.current ? Math.min((now - last.current) / 1000, 1 / 30) : 1 / 60
      last.current = now
      let moving = false

      for (let i = 0; i < 3; i++) {
        const k = STIFF[i]
        const c = 2 * Math.sqrt(k) * ZETA
        const a = -k * (shown.current[i] - want.current[i]) - c * vels.current[i]
        vels.current[i] += a * dt
        shown.current[i] += vels.current[i] * dt
        if (Math.abs(vels.current[i]) > 0.06 || Math.abs(shown.current[i] - want.current[i]) > 0.06) {
          moving = true
        }
      }

      if (!moving) {
        shown.current = [...want.current]
        vels.current = [0, 0, 0]
        raf.current = 0
        last.current = 0
        paint()
        return
      }
      paint()
      raf.current = requestAnimationFrame(tick)
    },
    [paint],
  )

  /* Measure the real content before the browser paints. Each group is laid
     out at its natural width for one pass, so a link added to lib/nav.ts
     widens its pill instead of spilling out of it. */
  useLayoutEffect(() => {
    const measure = () => {
      const w = group.current.map((el, i) =>
        el ? Math.ceil(el.getBoundingClientRect().width) + PAD[i] : FALLBACK[i],
      )
      if (w.every((v, i) => Math.abs(v - want.current[i]) <= 0.5)) return
      want.current = w

      // First measurement, or someone who asked the OS to cut motion: land on
      // it. Otherwise let the springs carry it, which is the whole point.
      if (first.current || reduced()) {
        first.current = false
        shown.current = [...w]
        vels.current = [0, 0, 0]
        paint()
        return
      }
      if (!raf.current) {
        last.current = 0
        raf.current = requestAnimationFrame(tick)
      }
    }
    measure()
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts
    // The display face changes the measurements, so remeasure once it lands.
    if (fonts && fonts.status !== 'loaded') fonts.ready.then(measure).catch(() => {})
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('resize', measure)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [paint, tick])

  // The sheet holds one history entry, so the phone's Back button closes it.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const [wordmark, links, actions] = shape.pills
  const span = spanOf(shape.pills.map((p) => p.w))

  return (
    <>
      {/* ── Desktop: the morphing glass bar ─────────────────────────────── */}
      <div className="pointer-events-none sticky top-0 z-40 hidden justify-center px-7 pt-[18px] lg:flex">
        <div className="pointer-events-auto relative h-[56px]" style={{ width: span }}>
          <div
            className="glass glass-bar absolute inset-0"
            style={{ clipPath: 'url(#ngf-navclip)' }}
          />

          <svg
            width={span}
            height={H}
            viewBox={`0 0 ${span} ${H}`}
            aria-hidden
            focusable="false"
            className="pointer-events-none absolute inset-0 overflow-visible"
          >
            <defs>
              <clipPath id="ngf-navclip" clipPathUnits="userSpaceOnUse">
                <path d={shape.d} />
              </clipPath>
              <linearGradient id="ngf-navrim" x1="0.1" y1="0" x2="0.72" y2="1">
                <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.98" />
                <stop offset="0.42" stopColor="#FFFFFF" stopOpacity="0.34" />
                <stop offset="1" stopColor="#0A0E14" stopOpacity="0.22" />
              </linearGradient>
            </defs>
            <path
              d={shape.d}
              fill="none"
              stroke="url(#ngf-navrim)"
              strokeWidth={1.3}
              strokeLinejoin="round"
            />
          </svg>

          <div className="absolute inset-0">
            <Link
              href="/"
              ref={(el) => {
                group.current[0] = el
              }}
              className="absolute top-0 flex h-[56px] w-max items-center justify-center whitespace-nowrap text-[16.5px] font-semibold tracking-[-0.022em] text-head"
              style={{ left: wordmark.x, width: wordmark.w }}
            >
              NGF&nbsp;Systems
            </Link>

            <nav
              aria-label="Main"
              ref={(el) => {
                group.current[1] = el
              }}
              className="absolute top-0 flex h-[56px] items-center justify-center gap-7 whitespace-nowrap"
              style={{ left: links.x, width: links.w }}
            >
              {NAV.map((item) => (
                <Link key={item.href} href={item.href} className={NAV_LINK}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <div
              ref={(el) => {
                group.current[2] = el
              }}
              className="absolute top-0 flex h-[56px] items-center justify-center gap-2 whitespace-nowrap"
              style={{ left: actions.x, width: actions.w }}
            >
              <a
                href={PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${NAV_LINK} px-1.5 py-2.5`}
              >
                Client login
              </a>
              <Link
                href="/contact?intent=Free%20mockup"
                className="inline-flex h-[42px] items-center rounded-full bg-accent px-[19px] text-[14.5px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,.3)] transition-colors hover:bg-accent-hover"
              >
                Get a free mockup
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Phone and tablet: bring it to the thumb ──────────────────────
          No top nav — only a branding strip. Navigation is one button in the
          bottom-RIGHT corner, where a right thumb rests, and the menu grows
          up out of it.

          It used to be a three-part dock: menu, a full-width "Get a free
          mockup", and a call button. That lost on every count — the CTA
          duplicated the one already in the hero a few hundred pixels above
          it, the call button was a third competing action, and together they
          spanned the whole width, so the one thing the bar is actually for
          was the smallest target on it. */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-line bg-ink/90 px-5 py-3.5 backdrop-blur-md lg:hidden">
        <Link href="/" className="text-[16px] font-semibold tracking-[-0.02em] text-head">
          NGF&nbsp;Systems
        </Link>
        <span className="text-[13px] text-dim">{CONTACT.location}</span>
      </div>

      <button
        type="button"
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-[#0C1016]/35 transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end lg:hidden">
        {/* The sheet GROWS out of the button rather than appearing under it:
            the grid-rows 0fr→1fr pair is the only way to transition to an
            auto height without measuring it in JS, and the scale/opacity are
            anchored to the bottom-right so the motion starts at the thumb.
            It stays mounted when closed — `hidden` cannot be transitioned —
            so it is made inert by hand with pointer-events, aria-hidden and
            tabIndex. */}
        <div
          id="ngf-dock-menu"
          aria-hidden={!open}
          className={`grid w-[min(78vw,272px)] origin-bottom-right transition-[grid-template-rows,opacity,transform,margin] duration-[360ms] ease-[cubic-bezier(.32,.72,0,1)] ${
            open
              ? 'mb-2.5 grid-rows-[1fr] scale-100 opacity-100'
              : 'pointer-events-none mb-0 grid-rows-[0fr] scale-90 opacity-0'
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            {/* Rows in reading order, so Contact — the one that converts —
                lands at the bottom next to the thumb without any reversing.
                Each row is an icon tile and a label rather than bare text:
                a plain list of six words reads as an unstyled fallback, and
                the tile is what makes the current page markable without
                shouting. Only the active row takes colour. */}
            <nav
              aria-label="Main"
              className="glass glass-pill flex flex-col gap-0.5 rounded-[26px] p-2"
            >
              {MENU.map((item, i) => {
                const active = !item.external && here === item.href
                const inner = (
                  <>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] transition-colors ${
                        active
                          ? 'bg-accent text-white'
                          : item.external
                            ? 'bg-[#0C1016]/[0.05] text-dim'
                            : 'bg-[#0C1016]/[0.06] text-head'
                      }`}
                    >
                      <Icon name={item.icon} className="h-[17px] w-[17px]" />
                    </span>
                    <span
                      className={`text-[16px] tracking-[-0.012em] ${
                        active
                          ? 'font-semibold text-accent'
                          : item.external
                            ? 'text-muted'
                            : 'font-medium text-head'
                      }`}
                    >
                      {item.label}
                    </span>
                  </>
                )
                const cls = `flex items-center gap-3 rounded-[18px] p-1.5 pr-4 transition-[opacity,transform,background-color] duration-300 ${
                  active ? 'bg-accent/[0.08]' : ''
                } ${open ? `translate-y-0 opacity-100 ${delayFor(i)}` : 'translate-y-1.5 opacity-0'}`

                return item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={open ? 0 : -1}
                    onClick={() => setOpen(false)}
                    className={`mt-1 border-t border-[#0C1016]/10 pt-2.5 ${cls}`}
                  >
                    {inner}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    tabIndex={open ? 0 : -1}
                    onClick={() => setOpen(false)}
                    className={cls}
                  >
                    {inner}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="ngf-dock-menu"
          aria-label={open ? 'Close menu' : 'Menu'}
          className="glass glass-pill flex h-[58px] w-[58px] items-center justify-center rounded-full transition-transform duration-200 active:scale-95"
        >
          {/* Two stacked icons that rotate past each other, rather than one
              path swapped on click — a swap has no in-between state and reads
              as a flicker next to a sheet that takes 360ms to open. */}
          <span className="relative block h-5 w-5">
            <svg
              viewBox="0 0 20 20"
              aria-hidden
              className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
                open ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
              }`}
            >
              <path
                d="M3 6h14 M3 10h14 M3 14h14"
                fill="none"
                stroke="#15181C"
                strokeWidth={1.8}
                strokeLinecap="round"
              />
            </svg>
            <svg
              viewBox="0 0 20 20"
              aria-hidden
              className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
                open ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
              }`}
            >
              <path
                d="M5 5l10 10 M15 5L5 15"
                fill="none"
                stroke="#15181C"
                strokeWidth={1.8}
                strokeLinecap="round"
              />
            </svg>
          </span>
        </button>
      </div>
    </>
  )
}
