import type { Metadata } from 'next'
import NgfEditBridge from '@/components/NgfEditBridge'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getNgfContent } from '@/lib/ngf'
import { Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import { GA_MEASUREMENT_ID } from '@/lib/analytics'
import './globals.css'

// One typeface for the whole site. Space Grotesk carries Direction A; the
// monospace that used to sit alongside it read as a developer tool.
const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  title: {
    default: 'NGF Systems — Websites built and managed for small businesses',
    template: '%s | NGF Systems',
  },
  description:
    'NGF Systems builds, hosts and manages websites for small businesses in West Michigan. Custom design, a portal you run yourself, and pricing based on what your site does — not how many pages it has.',
  keywords: [
    'web design',
    'web development',
    'Michigan',
    'website management',
    'small business websites',
    'realtor websites',
    'NGF Systems',
    'web design Michigan',
    'website builder Michigan',
    'affordable web design',
  ],
  authors: [{ name: 'NGF Systems', url: 'https://ngfsystems.com' }],
  creator: 'NGF Systems',
  metadataBase: new URL('https://ngfsystems.com'),
  other: { 'ngf-public-api': 'https://app.ngfsystems.com/api/public/website/cmnxxexlo00018q1up7l3jf3m' },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ngfsystems.com',
    siteName: 'NGF Systems',
    title: 'NGF Systems — Websites built and managed for small businesses',
    description:
      'NGF Systems builds, hosts and manages websites for small businesses in West Michigan. Custom design, a portal you run yourself, and pricing based on what your site does — not how many pages it has.',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'NGF Systems — Websites built and managed for small businesses',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NGF Systems — Websites built and managed for small businesses',
    description:
      'We build, host and manage websites for small businesses in West Michigan — with a portal you run yourself.',
    images: ['/api/og'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'NGF Systems',
  description:
    'Michigan-based web company that builds, hosts and manages websites for small businesses, with a client portal for editing content, tracking enquiries and managing bookings or orders.',
  url: 'https://ngfsystems.com',
  logo: 'https://ngfsystems.com/api/og',
  image: 'https://ngfsystems.com/api/og',
  telephone: '+1-906-448-9989',
  address: {
    '@type': 'PostalAddress',
    addressCity: 'Hudsonville',
    addressRegion: 'MI',
    addressCountry: 'US',
  },
  areaServed: {
    '@type': 'State',
    name: 'Michigan',
  },
  priceRange: '$$',
  sameAs: [],
  serviceType: [
    'Web Design',
    'Web Development',
    'Website Hosting',
    'Website Management',
    'Search Engine Optimization',
  ],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetched once here for the footer. Pages that need content call
  // getNgfContent() too; Next dedupes the fetch within a single request.
  const ngf = await getNgfContent()

  return (
    <html lang="en" className={display.variable} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0E100F" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag("js", new Date());
            gtag("config", "${GA_MEASUREMENT_ID}");
          `}
        </Script>
        <NgfEditBridge />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="pt-[68px]">
          {children}
        </main>
        <Footer ngf={ngf} />
      </body>
    </html>
  )
}
