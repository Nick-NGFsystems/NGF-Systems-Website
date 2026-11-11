/**
 * The four product screenshots the design rests on — the ONE table that says
 * where each lives and what it should show.
 *
 * `src: null` means the page renders a visibly-marked placeholder naming what
 * is missing (components/ui/ScreenshotSlot.tsx). That is deliberate: the site
 * reading as unfinished was never a palette problem, it was that there was not
 * a single real picture on it. A marked gap is honest; a drawn imitation of
 * the product is not, and the build this replaced hand-drew a fake leads inbox
 * with invented customer names in it.
 *
 * To fill one: put the file in /public/shots and set `src` to its path. Take
 * them from the Test Client account, never from a real client's portal — a
 * marketing page must not carry another business's enquiries.
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
    src: null,
    alt: 'The NGF portal website editor, with a client site open and one field being edited',
    want: 'The website editor, wide — a client site in the iframe, the sidebar open, one field mid-edit.',
    size: [1200, 620],
  },
  editorPhone: {
    src: null,
    alt: 'The NGF portal website editor on a phone',
    want: 'The editor on a phone, one field mid-edit.',
    size: [390, 320],
  },
  leads: {
    src: null,
    alt: 'The NGF portal leads inbox, showing enquiries with a status on each one',
    want: 'The leads inbox, with the status on each enquiry visible.',
    size: [720, 440],
  },
  bookings: {
    src: null,
    alt: 'The NGF portal bookings diary, showing appointments customers have booked',
    want: 'The bookings diary, with appointments on it.',
    size: [720, 440],
  },
} as const satisfies Record<string, Shot>

export type ShotKey = keyof typeof SHOTS

/** True while any screenshot is still missing — used by the doctor script. */
export const SHOTS_MISSING: readonly ShotKey[] = (
  Object.keys(SHOTS) as ShotKey[]
).filter((k) => SHOTS[k].src === null)
