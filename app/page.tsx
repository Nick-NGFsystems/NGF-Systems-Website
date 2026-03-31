import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import Features from '@/components/sections/Features'
import Pricing from '@/components/sections/Pricing'
import CTA from '@/components/sections/CTA'
import ClientBanner from '@/components/sections/ClientBanner'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <CTA />
      <ClientBanner />
      <Footer />
    </main>
  )
}
