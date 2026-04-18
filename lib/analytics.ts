export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? 'G-M6STJ09KGB'

type GTagWindow = Window & {
  gtag?: (...args: unknown[]) => void
  dataLayer?: unknown[]
}

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && typeof (window as GTagWindow).gtag === 'function') {
    ;(window as GTagWindow).gtag!('config', GA_MEASUREMENT_ID, { page_path: url })
  }
}
