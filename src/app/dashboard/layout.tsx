'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

import AnimatedLoader from '@components/common/animated-loader'
import Branding from '@components/common/branding'
import DashboardMenu from '@components/dashboard/dashboard-menu'
import ProfileMenu from '@components/dashboard/profile-menu'

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = useSession()
  const router = useRouter()
  const currentPage = usePathname().split('/').pop()

  if (session.status === 'loading') {
    return <AnimatedLoader type="fullscreen" />
  }

  if (session.status === 'unauthenticated') {
    router.push('/')
    toast.error('Login to access')
    return null
  }

  return (
    <section className="h-full min-h-screen w-full bg-gray-50">
      <aside
        className="fixed inset-y-0 left-0 hidden w-[300px] flex-col items-center gap-10 overflow-auto border-r-2 border-gray-300 bg-white p-6 md:flex"
        id="pc-menu"
      >
        <Branding />
        <DashboardMenu />
        <ProfileMenu />
      </aside>
      <aside
        className="fixed inset-x-0 bottom-0 z-10 flex border-t-2 border-gray-300 bg-white px-[10%] py-2 md:hidden"
        id="mobile-menu"
      >
        <DashboardMenu />
      </aside>
      <section className="min-h-screen w-full pb-20 pt-6 md:pl-[300px]">
        <main className="mx-auto h-full w-9/10 max-w-7xl">
          <p className="heading">{currentPage?.split('-').join(' ')}</p>
          {children}
        </main>
      </section>
    </section>
  )
}
