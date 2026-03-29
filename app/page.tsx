import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import Features from '@/components/sections/Features'
import CTA from '@/components/sections/CTA'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </main>
  )
}
