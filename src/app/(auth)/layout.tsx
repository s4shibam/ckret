'use client'

import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'

import Branding from '@components/common/branding'

export default function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { status } = useSession()

  if (status === 'authenticated') {
    redirect('/dashboard/profile')
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-gray-50 p-5 pb-20">
      <Branding />
      {children}
    </div>
  )
}
