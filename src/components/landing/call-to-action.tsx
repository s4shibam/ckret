'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

import MESSAGE_UI from '@/assets/ckret-message-ui.webp'
import SKETCH_UI from '@/assets/ckret-sketch-ui.webp'
import { CTA_HEADING, CTA_SUB_HEADING } from '@/lib/constants'

const CallToAction = () => {
  const { status } = useSession()

  if (status === 'loading') {
    return null
  }

  return (
    <div className="relative" id="color">
      <div className="absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-white to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-white to-transparent" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-5%] top-1/2 max-w-[50%] -translate-y-1/2 opacity-15">
          <Image
            priority
            alt="Message UI Preview"
            className="w-[95%] rotate-[-12deg] object-contain md:max-w-[400px] lg:max-w-[500px]"
            src={MESSAGE_UI}
          />
        </div>
        <div className="absolute right-[-5%] top-1/2 max-w-[50%] -translate-y-1/2 opacity-15">
          <Image
            priority
            alt="Sketch UI Preview"
            className="w-[95%] rotate-[12deg] object-contain md:max-w-[22rem] lg:max-w-[28rem]"
            src={SKETCH_UI}
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-20 px-5 py-16 sm:py-36">
        <div className="space-y-2 drop-shadow-2xl">
          <p className="bg-gradient-to-br from-ckret-primary to-ckret-secondary bg-clip-text text-center text-4xl font-semibold text-transparent xl:text-6xl/[5rem]">
            {CTA_HEADING?.[status]}
          </p>
          <p className="text-center text-2xl/6 font-semibold xl:text-4xl">
            {CTA_SUB_HEADING?.[status]}
          </p>
        </div>

        <Link
          className="relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-ckret-primary to-ckret-secondary px-8 py-3 text-lg font-medium text-white transition-all duration-300 hover:opacity-90"
          href={status === 'authenticated' ? '/dashboard/profile' : '/sign-in'}
        >
          {status === 'authenticated' ? 'Dashboard' : 'Go Anonymous'}
        </Link>
      </div>
    </div>
  )
}

export default CallToAction
