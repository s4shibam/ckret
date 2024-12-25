import React from 'react'

import Footer from '@/components/common/footer'
import NavBar from '@/components/common/nav-bar'

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <NavBar />
      {children}
      <Footer />
    </main>
  )
}

export default LandingLayout
