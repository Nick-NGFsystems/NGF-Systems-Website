'use client'

import Link from 'next/link'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { NAV, PORTAL_URL, CONTACT } from '@/lib/nav'

/* Written out rather than computed, because Tailwind scans source text: a
   template literal like `delay-[${i * 40}ms]` produces no class at all. One
   entry per NAV item plus the Client login row. */
const STAGGER = [
  'delay-[30ms]',
  'delay-[65ms]',
  'delay-[100ms]',
  'delay-[135ms]',
  'delay-[170ms]',
  'delay-[205ms]',
  'delay-[240ms]',
] as const

/* ── Geometry ─────────────────────────────────────────────────────────────
   Three glass pills — wordmark / links / actions — that fuse into one bar as
   the page scrolls and pull apart again at the top.

   The union is built as a SINGLE outline so the rim can be stroked in one
   pass; stroking each pill separately leaves cap arcs showing straight
   through the middle of a merged bar.

   A neck attaches TANGENTIALLY to the cap it leaves: at neck half-height h on
   a cap of radius r the attach point sits sqrt(r^2 - h^2) along the cap, so
   the curve grows out of the circle instead of being pasted onto it. h falls
   to zero as the gap reaches the threshold, and the waist closes faster than
   the attach does, so the thread thins and lets go rather than popping out of
   existence at a fixed width.                                              */

const H = 56
const R = 28
const CY = 28
/* Pill widths are MEASURED from the rendered content, never hard-coded.
   lib/nav.ts is the one table of destinations, so a link added there used to
   overflow a fixed 322px pill and spill into the next one. The measuring pass
   runs in useLayoutEffect, i.e. before the browser paints, so it is not a
   visible reflow. */
const PAD = [48, 56, 18] as const // breathing room added to each measured group
const FALLBACK = [168, 400, 292] as const // SSR and the first paint
const TH = 26 // gap at which a neck still forms
const STIFF = [240, 196] as const // right gap softer, so the two do not move in lockstep
const REST = 31 // apart, at the top of the page
const FUSED = 3 // together, once scrolled
const RANGE = 180 // px of scroll over which it morphs
const ZETA = 0.72 // damping ratio: 1 is a dead stop, lower overshoots

interface Pill {
  x: number
  w: number
}

interface Neck {
  ax: number
  bx: number
  h: number
  p: number
  k: number
  wob: number
}

/** The middle pill is the anchor and never moves; the outer two converge on
 *  it. Centring the whole group instead makes the middle drift by half the
 *  difference between the two gaps whenever the springs are out of step. */
function layout(gL: number, gR: number, w: readonly number[]): Pill[] {
  // The middle pill is the anchor and never moves; the outer two converge on
  // it. Centring the whole group instead makes the middle drift by half the
  // difference between the two gaps whenever the springs are out of step.
  // Deriving the anchor from REST also keeps the union centred at every gap.
  const anchor = w[0] + REST
  return [
    { x: anchor - gL - w[0], w: w[0] },
    { x: anchor, w: w[1] },
    { x: anchor + w[1] + gR, w: w[2] },
  ]
}

/** Full width of the bar when the pills are at rest. */
const spanOf = (w: readonly number[]) => w[0] + w[1] + w[2] + 2 * REST

function neck(a: Pill, b: Pill, vel: number): Neck | null {
  const g = b.x - (a.x + a.w)
  if (g >= TH) return null
  const t = 1 - Math.max(g, 0) / TH
  const h = R * 0.9 * Math.pow(t, 0.62)
  if (h < 0.35) return null
  const dx = Math.sqrt(Math.max(R * R - h * h, 0))
  let ax = a.x + a.w - R + dx
  let bx = b.x + R - dx
  if (bx < ax) {
    const m = (ax + bx) / 2
    ax = m
    bx = m
  }
  const speed = Math.abs(vel)
  return {
    ax,
    bx,
    h,
    p: 0.14 + 0.78 * t,
    k: Math.max(g * 0.44, 2.5) * (1 + Math.min(speed * 0.0035, 0.55)),
    wob: Math.max(-3.2, Math.min(3.2, vel * 0.018)),
  }
}

const n = (v: number) => Math.round(v * 100) / 100

function outline(pills: Pill[], vels: readonly number[]): string {
  const links = [neck(pills[0], pills[1], vels[0]), neck(pills[1], pills[2], vels[1])]
  const groups: number[][] = []
  let cur = [0]
  for (let i = 0; i < 2; i++) {
    if (links[i]) cur.push(i + 1)
    else {
      groups.push(cur)
      cur = [i + 1]
    }
  }
  groups.push(cur)

  let d = ''
  for (const gp of groups) {
    const first = pills[gp[0]]
    const last = pills[gp[gp.length - 1]]
    d += ` M ${n(first.x + R)} 0`
    for (let j = 0; j < gp.length; j++) {
      const p = pills[gp[j]]
      d += ` L ${n(p.x + p.w - R)} 0`
      if (j < gp.length - 1) {
        const k = links[gp[j]]!
        const cy = CY + k.wob
        d += ` A ${R} ${R} 0 0 1 ${n(k.ax)} ${n(cy - k.h)}`
        d += ` C ${n(k.ax + k.k)} ${n(cy - k.h * k.p)} ${n(k.bx - k.k)} ${n(cy - k.h * k.p)} ${n(k.bx)} ${n(cy - k.h)}`
        d += ` A ${R} ${R} 0 0 1 ${n(pills[gp[j + 1]].x + R)} 0`
      }
    }
    d += ` A ${R} ${R} 0 0 1 ${n(last.x + last.w - R)} ${H}`
    for (let m = gp.length - 1; m >= 0; m--) {
      const q = pills[gp[m]]
      d += ` L ${n(q.x + R)} ${H}`
      if (m > 0) {
        const k = links[gp[m - 1]]!
        const cy = CY + k.wob
        const pv = pills[gp[m - 1]]
        d += ` A ${R} ${R} 0 0 1 ${n(k.bx)} ${n(cy + k.h)}`
        d += ` C ${n(k.bx - k.k)} ${n(cy + k.h * k.p)} ${n(k.ax + k.k)} ${n(cy + k.h * k.p)} ${n(k.ax)} ${n(cy + k.h)}`
        d += ` A ${R} ${R} 0 0 1 ${n(pv.x + pv.w - R)} ${H}`
      }
    }
    d += ` A ${R} ${R} 0 0 1 ${n(first.x + R)} 0 Z`
  }
  return d.trim()
}

const NAV_LINK = 'text-[14.5px] text-muted transition-colors hover:text-head'

export default function Navbar() {
  const [widths, setWidths] = useState<readonly number[]>(FALLBACK)
  const [shape, setShape] = useState(() => {
    const p = layout(REST, REST, FALLBACK)
    return { d: outline(p, [0, 0]), pills: p }
  })
  const [open, setOpen] = useState(false)

  const group = useRef<Array<HTMLElement | null>>([null, null, null])

  const widthRef = useRef<readonly number[]>(FALLBACK)
  const gaps = useRef<[number, number]>([REST, REST])
  const vels = useRef<[number, number]>([0, 0])
  const target = useRef(REST)
  const raf = useRef(0)
  const last = useRef(0)

  const paint = useCallback(() => {
    const p = layout(gaps.current[0], gaps.current[1], widthRef.current)
    setShape({ d: outline(p, vels.current), pills: p })
  }, [])

  /* Each gap is its own damped spring, integrated per frame. A spring carries
     velocity, so it arrives with momentum and settles — an exponential ease
     can only decelerate into place, which reads as sliding, not flowing. */
  const tick = useCallback(
    (now: number) => {
      const dt = last.current ? Math.min((now - last.current) / 1000, 1 / 30) : 1 / 60
      last.current = now
      let moving = false

      for (let i = 0; i < 2; i++) {
        const k = STIFF[i]
        const c = 2 * Math.sqrt(k) * ZETA
        const a = -k * (gaps.current[i] - target.current) - c * vels.current[i]
        vels.current[i] += a * dt
        gaps.current[i] += vels.current[i] * dt
        if (
          Math.abs(vels.current[i]) > 0.06 ||
          Math.abs(gaps.current[i] - target.current) > 0.06
        ) {
          moving = true
        }
      }

      if (!moving) {
        gaps.current = [target.current, target.current]
        vels.current = [0, 0]
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
      if (w.some((v, i) => Math.abs(v - widthRef.current[i]) > 0.5)) {
        widthRef.current = w
        setWidths(w)
        const p = layout(gaps.current[0], gaps.current[1], w)
        setShape({ d: outline(p, vels.current), pills: p })
      }
    }
    measure()
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts
    // The display face changes the measurements, so remeasure once it lands.
    if (fonts && fonts.status !== 'loaded') fonts.ready.then(measure).catch(() => {})
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0
      let pr = Math.max(0, Math.min(1, y / RANGE))
      pr = pr * pr * (3 - 2 * pr) // smoothstep, so it eases in and out
      target.current = REST + (FUSED - REST) * pr

      if (reduced) {
        gaps.current = [target.current, target.current]
        vels.current = [0, 0]
        paint()
        return
      }
      if (!raf.current) {
        last.current = 0
        raf.current = requestAnimationFrame(tick)
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
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
  const span = spanOf(widths)

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
          className={`grid w-[min(70vw,248px)] origin-bottom-right transition-[grid-template-rows,opacity,transform,margin] duration-[360ms] ease-[cubic-bezier(.32,.72,0,1)] ${
            open
              ? 'mb-2.5 grid-rows-[1fr] scale-100 opacity-100'
              : 'pointer-events-none mb-0 grid-rows-[0fr] scale-90 opacity-0'
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <nav
              aria-label="Main"
              className="glass glass-pill flex flex-col-reverse rounded-[26px] p-2"
            >
              {/* Reversed so the link most people want sits nearest the thumb;
                  reading order would put Contact furthest away. The stagger
                  runs in DOM order, which is bottom-to-top under
                  flex-col-reverse, so the sheet unrolls upward from the
                  button. */}
              {[...NAV].reverse().map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-[50px] items-center rounded-[18px] px-4 text-[16.5px] font-medium text-head transition-[opacity,transform] duration-300 ${
                    open
                      ? `translate-y-0 opacity-100 ${STAGGER[i] ?? ''}`
                      : 'translate-y-1.5 opacity-0'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className={`flex min-h-[50px] items-center rounded-[18px] px-4 text-[16.5px] text-muted transition-[opacity,transform] duration-300 ${
                  open
                    ? `translate-y-0 opacity-100 ${STAGGER[NAV.length] ?? ''}`
                    : 'translate-y-1.5 opacity-0'
                }`}
              >
                Client login
              </a>
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
