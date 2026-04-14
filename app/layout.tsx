import type { Metadata } from 'next'
import NgfEditBridge from '@/components/NgfEditBridge'
import { Sora, Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['300', '400', '500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: {
    default: 'NGF Systems — Web Design & Management',
    template: '%s | NGF Systems',
  },
  description:
    'NGF Systems is a Michigan-based web development company. We build and manage professional websites for businesses of all sizes — custom builds, ongoing support, and flexible pricing.',
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
    title: 'NGF Systems — Web Design & Management',
    description:
      'NGF Systems is a Michigan-based web development company. We build and manage professional websites for businesses of all sizes — custom builds, ongoing support, and flexible pricing.',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'NGF Systems — Web Design & Management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NGF Systems — Web Design & Management',
    description:
      'NGF Systems is a Michigan-based web development company. We build and manage professional websites for businesses of all sizes.',
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
    'Michigan-based web development company building and managing professional websites for small businesses and realtors.',
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
  serviceType: ['Web Design', 'Web Development', 'Website Management'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${sora.variable} ${inter.variable} antialiased`}>
        <NgfEditBridge />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
