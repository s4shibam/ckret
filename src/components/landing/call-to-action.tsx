'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { CTA_HEADING, CTA_SUB_HEADING } from '@lib/constants'

import { Button } from '@components/ui/button'

import SignInModal from '../common/signin-modal'

const CallToAction = () => {
  const { status } = useSession()

  if (status === 'loading') {
    return null
  }

  return (
    <div
      className="bg-gradient-to-br from-transparent via-transparent to-rose-200"
      id="color"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-20 px-5 py-14 sm:py-28">
        <div>
          <p className="bg-gradient-to-br from-ckret-primary to-ckret-secondary bg-clip-text text-center text-4xl font-semibold text-transparent xl:text-6xl/[5rem]">
            {CTA_HEADING?.[status]}
          </p>
          <p className="text-center text-2xl font-semibold xl:text-4xl">
            {CTA_SUB_HEADING?.[status]}
          </p>
        </div>

        {status === 'authenticated' ? (
          <Button
            asChild
            className="h-14 w-60 text-2xl drop-shadow-xl"
            size="lg"
          >
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        ) : (
          <SignInModal>
            <Button className="h-14 w-60 text-2xl drop-shadow-xl">
              Be Anonymous
            </Button>
          </SignInModal>
        )}
      </div>
    </div>
  )
}

export default CallToAction
