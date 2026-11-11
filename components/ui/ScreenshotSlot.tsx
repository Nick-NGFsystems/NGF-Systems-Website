import { SHOTS, type ShotKey } from '@/lib/shots'

/**
 * A screenshot, or a visibly-marked slot where one belongs.
 *
 * The design rests on four real screenshots of the portal. Until they exist
 * this renders a labelled placeholder that says what is missing and at what
 * size — NOT a drawn imitation of the product. The build this replaced hand-
 * drew a fake leads inbox with invented customer names in it, which was both
 * less convincing than a real screenshot and a small lie about the product.
 *
 * To fill one: drop the file in /public/shots and set its `src` in
 * lib/shots.ts. Nothing else changes.
 *
 * `tone` picks the placeholder for a light section or for the graphite hero
 * panel; it has no effect once a real image is in place.
 */
export default function ScreenshotSlot({
  shot,
  className = '',
  tone = 'light',
  priority = false,
}: {
  shot: ShotKey
  className?: string
  tone?: 'light' | 'dark'
  priority?: boolean
}) {
  const { src, alt, want, size } = SHOTS[shot]

  if (src) {
    return (
      // Deliberately a plain <img>, not next/image. These are already webp at
      // the exact size the layout uses, so Vercel's optimizer would re-encode
      // them (a billed transformation per variant) for no gain.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        width={size[0]}
        height={size[1]}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={`block h-full w-full object-cover object-top ${className}`}
      />
    )
  }

  const dark = tone === 'dark'

  return (
    <div
      role="img"
      aria-label={`Placeholder: ${want}`}
      className={`flex h-full w-full flex-col items-center justify-center gap-2.5 p-6 text-center ${
        dark
          ? 'bg-[#232833] bg-[repeating-linear-gradient(135deg,transparent_0_11px,rgba(255,255,255,.055)_11px_12px)]'
          : 'bg-[#E9EEF4] bg-[repeating-linear-gradient(135deg,transparent_0_11px,rgba(26,29,33,.06)_11px_12px)]'
      } ${className}`}
    >
      <p
        className={`text-[11.5px] font-semibold uppercase tracking-[0.1em] ${
          dark ? 'text-[#8FB6DA]' : 'text-accent'
        }`}
      >
        Screenshot needed
      </p>
      <p
        className={`max-w-[32em] text-[14.5px] leading-relaxed ${
          dark ? 'text-onwell' : 'text-muted'
        }`}
      >
        {want}
      </p>
      <p className={`text-[12.5px] ${dark ? 'text-onwell-dim' : 'text-dim'}`}>
        {size[0]}&times;{size[1]} &middot; set it in lib/shots.ts
      </p>
    </div>
  )
}
