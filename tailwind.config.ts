import type { Config } from 'tailwindcss'

/**
 * Product-led, as tokens.
 *
 * ONE design, light-first. The earlier build was dark-first (Direction A) and
 * read as unfinished, because the page had no imagery in it and a dark ground
 * with nothing on it is just empty. This palette is near-white with ONE
 * graphite band (the hero) and ONE accent, so the screenshots are the only
 * colour that matters on the page.
 *
 * `head` exists because `text-white` was used 61 times for headings in the
 * dark build. On a light ground that is invisible, and a literal colour class
 * cannot be re-pointed from here — so headings now use a token and the
 * inversion lives in this file.
 *
 * White text is still correct in exactly three places, and those keep
 * `text-white` on purpose: inside the primary button, inside the graphite
 * hero panel, and in the footer.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // One typeface, tight tracking at display sizes.
        sans: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        /** Page background. */
        ink: '#FFFFFF',
        /** Raised and inset surfaces: cards, the pricing band. */
        panel: '#F6F8FA',
        /** The graphite used for the hero panel and the footer. */
        well: '#16181C',
        /** Every border and divider. */
        line: '#E3E8ED',
        /** Headings and primary text. */
        head: '#15181C',
        /** Secondary text. 7.4:1 on white. */
        muted: '#434B55',
        /** Tertiary text — captions, legal. 5.3:1 on white. */
        dim: '#5C6671',
        /** Primary action. 6.1:1 on white, so it is legible as text too. */
        accent: {
          DEFAULT: '#0B5CAD',
          light: '#2E7DC9',
          hover: '#08487F',
        },
        /** Eyebrows and small emphasis. Kept as a token name the pages already use. */
        sand: '#0B5CAD',
        /** Text and borders on the graphite panel. */
        onwell: {
          DEFAULT: '#B4BCC6',
          dim: '#8A93A0',
          line: 'rgba(255,255,255,.12)',
        },
      },
    },
  },
  plugins: [],
}

export default config
