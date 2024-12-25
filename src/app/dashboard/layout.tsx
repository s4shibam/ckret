'use client'

import { useRouter } from 'next/navigation'
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
        className="fixed inset-y-0 left-0 z-40 hidden w-[16rem] flex-col items-center gap-10 overflow-auto border-r border-gray-300 bg-white p-4 md:flex"
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
      <section className="min-h-screen w-full pb-20 pt-6 md:pl-[16rem]">
        <main className="mx-auto mt-20 h-full w-full px-4 md:px-8">
          {children}
        </main>
      </section>
    </section>
  )
}
