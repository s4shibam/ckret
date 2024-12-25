'use client'

import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'

import AnimatedLoader from '@/components/common/animated-loader'
import Branding from '@/components/common/branding'

export default function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { status } = useSession()

  if (status === 'authenticated') {
    redirect('/dashboard/profile')
  }

  if (status === 'loading') {
    return <AnimatedLoader type="fullscreen" />
  }

  return (
    <div className="bg-ckret-gradient flex min-h-screen w-full flex-col items-center justify-center gap-6 px-6 py-8 pb-20">
      <Branding />
      {children}
    </div>
  )
}
