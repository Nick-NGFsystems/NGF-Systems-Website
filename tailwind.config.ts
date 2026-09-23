import type { Config } from 'tailwindcss'

/**
 * Direction A, as tokens.
 *
 * The site is dark-first and has ONE design, not a light and a dark one. The
 * previous build carried `dark:` variants on every element plus a system
 * theme toggle, which meant two designs to maintain and only one of them ever
 * reviewed — and it was why ngfsystems.com rendered dark for anyone whose
 * machine was in dark mode while the light version was the one being designed.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // One typeface. No monospace anywhere — it read as a developer tool.
        sans: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        /** Page background. A charcoal with a little green in it, not pure black. */
        ink: '#0E100F',
        /** Raised surfaces: nav, card headers, sidebars. */
        panel: '#171A18',
        /** Deeper than the page — the footer. */
        well: '#0B0D0C',
        /** Every border and divider. */
        line: '#262825',
        /** Secondary text. */
        muted: '#9A9C95',
        /** Tertiary text — captions, legal. */
        dim: '#7E817B',
        /** Primary action and the product-UI highlight. Muted petrol. */
        accent: {
          DEFAULT: '#5E8B87',
          light: '#7BA39C',
          hover: '#6E9C98',
        },
        /** The warm counterpoint: eyebrows, emphasis, "won" states. */
        sand: '#C2A379',
      },
    },
  },
  plugins: [],
}

export default config
