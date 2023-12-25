'use client'

import Image from 'next/image'

import LOGO from '@assets/logo.svg'

const LandingPage = () => {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-gray-100 p-10">
      <div className="flex max-w-md flex-col items-center gap-2">
        <Image alt="" height={150} src={LOGO} width={150} />
        <p className="text-center text-4xl font-bold tracking-wide">Ckret</p>
        <p className="text-center text-3xl font-semibold">
          <span className="block">Speak your mind,</span>
          <span className="block">Keep your identity!</span>
        </p>
        <p className="mt-4 text-center text-xl">
          CKret is an anonymous messaging platform. <br />
          Exchange anonymous questions, feedback, suggestions, dares, and
          challenges with your friends, families, and coworkers.
        </p>
      </div>
      <div className="select-none rounded-lg bg-gray-900 px-4 py-2 text-2xl text-white">
        Launching Soon
      </div>
    </main>
  )
}

export default LandingPage
