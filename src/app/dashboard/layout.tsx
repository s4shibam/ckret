'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

import AnimatedLoader from '@/components/common/animated-loader'
import Branding from '@/components/common/branding'
import DashboardMenu from '@/components/dashboard/dashboard-menu'
import ProfileMenu from '@/components/dashboard/profile-menu'

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
    <section className="h-full min-h-screen w-full bg-zinc-50">
      <aside
        className="fixed inset-y-0 left-0 z-40 hidden w-[16rem] flex-col items-center gap-10 overflow-auto border-r border-zinc-300 bg-white p-4 md:flex"
        id="pc-menu"
      >
        <Branding />
        <DashboardMenu />
        <ProfileMenu />
      </aside>
      <aside
        className="fixed inset-x-0 bottom-0 z-10 flex border-t-2 border-zinc-300 bg-white px-[10%] py-2 md:hidden"
        id="mobile-menu"
      >
        <DashboardMenu />
      </aside>
      <section className="min-h-screen w-full md:pl-[16rem]">
        <main className="mx-auto mt-16 h-full w-full p-4 md:p-8">
          {children}
        </main>
        <div className="h-20" />
      </section>
    </section>
  )
}
