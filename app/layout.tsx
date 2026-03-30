import type { Metadata } from 'next'
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
  title: 'NGFsystems — Web Design & Management',
  description: 'NGFsystems is a Michigan-based web development company. We build and manage professional websites for businesses of all sizes — custom builds, ongoing support, and flexible pricing.',
  keywords: ['web design', 'web development', 'Michigan', 'website management', 'small business websites', 'realtor websites', 'NGFsystems'],
  authors: [{ name: 'NGFsystems', url: 'https://ngfsystems.com' }],
  creator: 'NGFsystems',
  metadataBase: new URL('https://ngfsystems.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ngfsystems.com',
    siteName: 'NGFsystems',
    title: 'NGFsystems — Web Design & Management',
    description: 'NGFsystems is a Michigan-based web development company. We build and manage professional websites for businesses of all sizes — custom builds, ongoing support, and flexible pricing.',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'NGFsystems — Web Design & Management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NGFsystems — Web Design & Management',
    description: 'NGFsystems is a Michigan-based web development company. We build and manage professional websites for businesses of all sizes.',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sora.variable} ${inter.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
