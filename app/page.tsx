import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import Features from '@/components/sections/Features'
import Pricing from '@/components/sections/Pricing'
import CTA from '@/components/sections/CTA'
import ClientBanner from '@/components/sections/ClientBanner'
import Footer from '@/components/layout/Footer'
import { getNgfContent } from '@/lib/ngf'

export default async function HomePage() {
  const ngf = await getNgfContent()
  return (
    <main>
      <Navbar />
      <Hero ngf={ngf} />
      <Features ngf={ngf} />
      <Pricing ngf={ngf} />
      <CTA ngf={ngf} />
      <ClientBanner ngf={ngf} />
      <Footer ngf={ngf} />
    </main>
  )
}
