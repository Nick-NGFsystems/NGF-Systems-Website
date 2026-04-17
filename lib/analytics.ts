export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? 'G-M6STJ09KGB'

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('config', GA_MEASUREMENT_ID, { page_path: url })
  }
}
