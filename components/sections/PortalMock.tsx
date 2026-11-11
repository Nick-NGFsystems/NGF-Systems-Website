'use client'

import { useState, type ReactElement } from 'react'
import Icon, { type IconName } from '@/components/ui/Icon'

/**
 * A preview of the client portal, drawn rather than screenshotted.
 *
 * This repo's rule is that we do not hand-draw fakes of the product — the old
 * `PortalPanels.tsx` was deleted for inventing customer names and presenting
 * them as a real inbox. This is the narrow exception, and it survives only
 * because of how it is labelled: every value in it is a visible placeholder
 * ("Your Business", "Your customer"), the frame says PREVIEW in the chrome,
 * and the caption underneath says it is sample content. It is a template of
 * the portal, not a claim about anybody's data.
 *
 * The structure IS real, though — the tabs, the editor's field list, the lead
 * statuses and the weekly-hours rows all mirror what the platform actually
 * ships (NGF-Systems-app/lib/portal-capabilities.ts). Do not add a panel here
 * for something the portal cannot do.
 */

type TabKey = 'dashboard' | 'editor' | 'leads' | 'bookings'

const TABS: { key: TabKey; label: string; icon: IconName }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: 'layout' },
  { key: 'editor', label: 'Website editor', icon: 'edit' },
  { key: 'leads', label: 'Leads', icon: 'inbox' },
  { key: 'bookings', label: 'Bookings', icon: 'calendar' },
]

/** What each tab is for, in the client's words. Shown under the frame. */
const BLURB: Record<TabKey, string> = {
  dashboard:
    'The first thing you see. What came in, what is waiting on you, and how the site is doing — no digging.',
  editor:
    'Your live site with every editable piece listed down the side. Change it, preview it, publish it. Every version is kept.',
  leads:
    'Every enquiry your site takes, with a status on each one so you can see what you have already answered.',
  bookings:
    'Your services, the hours you actually work and the time you are taking off. Customers book themselves into the gaps.',
}

const SHELL = 'rounded-[10px] border border-line bg-ink'

function Tile({ label, value }: { label: string; value: string }) {
  return (
    <div className={`${SHELL} px-4 py-3.5`}>
      <p className="text-[12px] uppercase tracking-[0.1em] text-dim">{label}</p>
      <p className="mt-1.5 text-[22px] font-semibold tracking-[-0.02em] text-head">{value}</p>
    </div>
  )
}

/** A stand-in for a line of the client's own text. */
function Bar({ w }: { w: string }) {
  return <span className={`block h-2 rounded-full bg-[#0C1016]/[0.09] ${w}`} />
}

function Pill({ label, tone }: { label: string; tone: 'new' | 'open' | 'won' }) {
  const tones = {
    new: 'bg-accent/[0.1] text-accent',
    open: 'bg-[#0C1016]/[0.06] text-muted',
    won: 'bg-[#1C7C4A]/[0.12] text-[#1C7C4A]',
  }
  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-1 text-[11.5px] font-semibold ${tones[tone]}`}
    >
      {label}
    </span>
  )
}

function Dashboard() {
  return (
    <>
      <p className="text-[13px] text-dim">Signed in as</p>
      <h3 className="mt-1 text-[21px] font-semibold tracking-[-0.02em] text-head">Your Business</h3>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Tile label="New enquiries" value="3" />
        <Tile label="Bookings this week" value="6" />
        <Tile label="Invoices due" value="0" />
      </div>
      <div className={`${SHELL} mt-3 p-4`}>
        <p className="text-[13px] font-semibold text-head">Needs you</p>
        <ul className="mt-3 space-y-2.5">
          <li className="flex items-center gap-2.5 text-[13.5px] text-muted">
            <span className="text-accent">
              <Icon name="inbox" className="h-4 w-4" />
            </span>
            Two enquiries you have not replied to
          </li>
          <li className="flex items-center gap-2.5 text-[13.5px] text-muted">
            <span className="text-accent">
              <Icon name="edit" className="h-4 w-4" />
            </span>
            Draft changes to your opening hours, not published yet
          </li>
        </ul>
      </div>
    </>
  )
}

function Editor() {
  const fields = ['Headline', 'About your business', 'Opening hours', 'Phone number', 'Photos']
  return (
    <div className="grid gap-3 sm:grid-cols-[150px_minmax(0,1fr)]">
      <div className={`${SHELL} p-2.5`}>
        <p className="px-1.5 pb-2 text-[11px] uppercase tracking-[0.1em] text-dim">Your content</p>
        <ul className="space-y-0.5">
          {fields.map((f, i) => (
            <li
              key={f}
              className={`rounded-[7px] px-2 py-1.5 text-[13px] ${
                i === 2 ? 'bg-accent/[0.1] font-semibold text-accent' : 'text-muted'
              }`}
            >
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className={`${SHELL} overflow-hidden`}>
        <div className="border-b border-line px-3.5 py-2 text-[11.5px] text-dim">
          Your site, live preview
        </div>
        <div className="space-y-3 p-4">
          <p className="text-[17px] font-semibold tracking-[-0.02em] text-head">Your Business</p>
          <Bar w="w-4/5" />
          <Bar w="w-3/5" />
          <div className="rounded-[9px] border-2 border-accent bg-accent/[0.05] p-3">
            <p className="text-[11px] uppercase tracking-[0.1em] text-accent">Editing</p>
            <p className="mt-1.5 text-[14px] text-head">Open 9 to 5, Monday to Friday</p>
          </div>
          <Bar w="w-2/3" />
        </div>
      </div>
    </div>
  )
}

function Leads() {
  const rows: { who: string; via: string; when: string; tone: 'new' | 'open' | 'won' }[] = [
    { who: 'Your customer', via: 'Contact form', when: 'Today', tone: 'new' },
    { who: 'Another customer', via: 'Contact form', when: 'Yesterday', tone: 'open' },
    { who: 'A returning customer', via: 'Quote request', when: 'Monday', tone: 'won' },
  ]
  const label = { new: 'New', open: 'Contacted', won: 'Won' } as const
  return (
    <div className={`${SHELL} overflow-hidden`}>
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <p className="text-[13px] font-semibold text-head">Your enquiries</p>
        <p className="text-[12px] text-dim">All · New · Contacted · Won</p>
      </div>
      <ul className="divide-y divide-line">
        {rows.map((r) => (
          <li key={r.who} className="flex items-center gap-3 px-4 py-3.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0C1016]/[0.06] text-dim">
              <Icon name="users" className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[14px] font-medium text-head">{r.who}</span>
              <span className="mt-1 block text-[12.5px] text-dim">
                {r.via} · {r.when}
              </span>
            </span>
            <Pill label={label[r.tone]} tone={r.tone} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function Bookings() {
  const days: [string, string][] = [
    ['Monday', '9:00 — 17:00'],
    ['Tuesday', '9:00 — 17:00'],
    ['Wednesday', '9:00 — 17:00'],
    ['Thursday', 'Closed'],
  ]
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className={`${SHELL} p-4`}>
        <p className="text-[13px] font-semibold text-head">Your weekly hours</p>
        <ul className="mt-3 space-y-2.5">
          {days.map(([d, h]) => (
            <li key={d} className="flex items-center justify-between text-[13.5px]">
              <span className="text-muted">{d}</span>
              <span className={h === 'Closed' ? 'text-dim' : 'text-head'}>{h}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={`${SHELL} p-4`}>
        <p className="text-[13px] font-semibold text-head">What you offer</p>
        <ul className="mt-3 space-y-2">
          {['Your first service · 30 min', 'Your second service · 1 hr'].map((s) => (
            <li
              key={s}
              className="rounded-[8px] bg-[#0C1016]/[0.04] px-3 py-2.5 text-[13.5px] text-muted"
            >
              {s}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[12.5px] leading-relaxed text-dim">
          Customers pick a slot themselves and get a confirmation by email or text.
        </p>
      </div>
    </div>
  )
}

const PANELS: Record<TabKey, () => ReactElement> = {
  dashboard: Dashboard,
  editor: Editor,
  leads: Leads,
  bookings: Bookings,
}

export default function PortalMock() {
  const [tab, setTab] = useState<TabKey>('dashboard')
  const Panel = PANELS[tab]

  return (
    <div>
      <div className="overflow-hidden rounded-[18px] border border-line bg-ink shadow-[0_18px_44px_-24px_rgba(16,24,40,.28)]">
        {/* Browser chrome, so it reads as a thing you open rather than a
            diagram. The address is real; the content behind it is not. */}
        <div className="flex items-center gap-3 border-b border-line bg-panel px-4 py-2.5">
          <span aria-hidden className="flex gap-1.5">
            {['bg-[#0C1016]/15', 'bg-[#0C1016]/15', 'bg-[#0C1016]/15'].map((c, i) => (
              <span key={i} className={`h-2.5 w-2.5 rounded-full ${c}`} />
            ))}
          </span>
          <span className="flex-1 truncate rounded-full bg-ink px-3 py-1 text-center text-[12px] text-dim">
            app.ngfsystems.com
          </span>
          <span className="shrink-0 rounded-full bg-accent/[0.1] px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-accent">
            Preview
          </span>
        </div>

        {/* The portal's own top bar. */}
        <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
          <span className="text-[14px] font-semibold tracking-[-0.02em] text-accent">
            NGFsystems
          </span>
          <span className="ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-accent/[0.12] text-accent">
            <Icon name="users" className="h-[15px] w-[15px]" />
          </span>
        </div>

        <div
          role="tablist"
          aria-label="Portal preview"
          className="flex gap-1 overflow-x-auto border-b border-line px-2.5 py-2"
        >
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              id={`portal-tab-${t.key}`}
              aria-selected={tab === t.key}
              aria-controls={`portal-panel-${t.key}`}
              onClick={() => setTab(t.key)}
              className={`flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-[13.5px] transition-colors ${
                tab === t.key
                  ? 'bg-accent font-semibold text-white'
                  : 'text-muted hover:bg-[#0C1016]/[0.05]'
              }`}
            >
              <Icon name={t.icon} className="h-[15px] w-[15px]" />
              {t.label}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`portal-panel-${tab}`}
          aria-labelledby={`portal-tab-${tab}`}
          className="bg-panel p-4 sm:p-5"
        >
          <Panel />
        </div>
      </div>

      <p className="mt-4 text-[13.5px] leading-relaxed text-dim">
        Sample content. Every name and number above is a placeholder — in your portal they are your
        own. {BLURB[tab]}
      </p>
    </div>
  )
}
