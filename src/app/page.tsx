import Footer from '@components/common/footer'
import NavBar from '@components/common/nav-bar'
import CallToAction from '@components/landing/call-to-action'
import FAQs from '@components/landing/faqs'
import Features from '@components/landing/features'
import Guide from '@components/landing/guide'
import Hero from '@components/landing/hero'

const LandingPage = () => {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <NavBar />

      <Hero />

      <Features />

      <Guide />

      <CallToAction />

      <FAQs />

      <Footer />
    </main>
  )
}

export default LandingPage
