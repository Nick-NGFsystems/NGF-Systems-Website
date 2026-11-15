/**
 * The four product screenshots the design rests on — the ONE table that says
 * where each lives and what it should show.
 *
 * `src: null` means the shot is still missing. In DEVELOPMENT the page then
 * renders a visibly-marked placeholder naming what is needed
 * (components/ui/ScreenshotSlot.tsx); in PRODUCTION it renders nothing, and
 * `npm run doctor` reports the gap instead. The marker is a note to whoever is
 * building the site — it is not for visitors, and it reached them once already
 * (see the ScreenshotSlot header).
 *
 * A marked gap is honest; a drawn imitation of the product is not, and the
 * build this replaced hand-drew a fake leads inbox with invented customer
 * names in it.
 *
 * To fill one: put the file in /public/shots and set `src` to its path. Take
 * them from the Test Client account, never from a real client's portal — a
 * marketing page must not carry another business's enquiries, and must not
 * carry anyone's phone number or email. The `editor` shot below was captured
 * from a real client's site and published with the owner's mobile legible in
 * three places and his work email in a fourth; those four regions are blurred
 * in the file as of 2026-11-15. CHECK A NEW CAPTURE FOR CONTACT DETAILS
 * BEFORE COMMITTING IT — zoom into every panel, not just the one the shot is
 * about.
 *
 * Capture at twice the listed size so they stay crisp on a retina screen; the
 * `size` below is the layout size the slot reserves.
 */
export interface Shot {
  /** `/shots/<file>` once captured, else null. */
  src: string | null
  /** Alt text used when a real image is in place. */
  alt: string
  /** What the picture has to show. Rendered in the placeholder. */
  want: string
  /** Layout size in CSS px: [width, height]. */
  size: [number, number]
}

export const SHOTS = {
  editor: {
    // Captured from a real client's site (a drone-spraying business). The
    // owner's mobile was legible in the site nav, in the hero call button and
    // in the contact panel, and his work email beside it — all four published
    // on this site's hero from 2026-11-11 to 2026-11-15. They are blurred in
    // the file now. The business is still identifiable; whether NGF may
    // feature their site is Nick's call, not a privacy fault.
    src: '/shots/editor.webp',
    alt: 'The NGF portal website editor, with a client site open in the preview and the Business Name field being edited',
    want: 'The website editor, wide — a client site in the iframe, the sidebar open, one field mid-edit.',
    size: [1915, 907],
  },
  editorPhone: {
    src: null,
    alt: 'The NGF portal website editor on a phone',
    want: 'The editor on a phone, one field mid-edit.',
    size: [390, 320],
  },
  leads: {
    // Deliberately still empty. The capture supplied on 2026-11-11 showed
    // "No submissions yet · All 0", and it sits directly under the heading
    // "Every enquiry, in one place you own" — a screenshot of an empty inbox
    // argues against the claim it is meant to prove. Needs three or four
    // submissions in the Test Client account first, with a different status
    // on each so the New / Contacted / Won tabs are doing visible work.
    src: null,
    alt: 'The NGF portal leads inbox, showing enquiries with a status on each one',
    want: 'The leads inbox with THREE OR FOUR enquiries in it, each at a different status — an empty inbox undercuts the claim this sits under.',
    size: [1270, 620],
  },
  bookings: {
    src: '/shots/bookings.webp',
    alt: 'The NGF portal booking settings, showing weekly opening hours and a service',
    want: 'The bookings page, with weekly hours and at least one service set.',
    size: [1290, 740],
  },
} as const satisfies Record<string, Shot>

export type ShotKey = keyof typeof SHOTS

/** Is this shot actually captured? Callers that would otherwise draw an empty
 *  frame around nothing ask this first — a missing shot renders null in
 *  production, so the frame would survive the picture. */
export const hasShot = (k: ShotKey): boolean => SHOTS[k].src !== null

/** Every screenshot still missing. Reported by `npm run doctor` — which is now
 *  the ONLY thing that announces a gap, since production renders no marker. */
export const SHOTS_MISSING: readonly ShotKey[] = (
  Object.keys(SHOTS) as ShotKey[]
).filter((k) => SHOTS[k].src === null)
