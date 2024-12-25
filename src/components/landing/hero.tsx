import Image from 'next/image'

import HERO from '@assets/ckret-hero-image.webp'

import CreateLink from '@components/common/create-link'

const Hero = () => {
  return (
    <div className="doodle relative flex size-full min-h-screen flex-col items-center justify-center gap-6 border-b-2 border-ckret-primary px-6 py-20 md:flex-row">
      <div className="flex min-h-[11rem]  min-w-[20rem] flex-col justify-center gap-6">
        <div className="flex select-none flex-col justify-center text-5xl drop-shadow-xl sm:text-6xl md:justify-start lg:text-7xl">
          <p className="animate-fade-up overflow-hidden text-center font-extrabold md:text-left">
            Speak Your{' '}
            <span className="bg-gradient-to-br from-ckret-primary to-ckret-secondary bg-clip-text text-transparent">
              Mind.
            </span>
          </p>
          <p className="animate-fade-up overflow-hidden text-center font-extrabold md:text-left">
            Keep Your{' '}
            <span className="bg-gradient-to-tr from-ckret-primary to-ckret-secondary bg-clip-text text-transparent">
              Identity!
            </span>
          </p>
        </div>

        <div className="hidden max-w-md animate-fade-up rounded-2xl bg-gradient-to-br from-zinc-600/75 to-zinc-800/90 p-4 backdrop-blur-sm md:block">
          <div className="mx-auto w-full max-w-md">
            <CreateLink />
          </div>
        </div>
      </div>

      <div className="group relative h-auto w-[90%] animate-fade-up overflow-hidden rounded-2xl drop-shadow-lg sm:max-w-[28rem] md:max-w-[32rem]">
        <Image
          alt="Ckret Hero Image"
          className="size-full transition-all duration-500 hover:scale-105"
          draggable={false}
          height={1500}
          src={HERO}
          width={1500}
        />

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-ckret-secondary/20 px-2 py-3 text-center text-lg font-medium tracking-wide text-black opacity-0 transition-all duration-500 group-hover:opacity-100 md:text-xl">
          Santa&apos;s Profile on Ckret.
        </div>

        <div className="absolute inset-x-5 bottom-0 h-px bg-gradient-to-r from-transparent via-ckret-secondary to-transparent" />
      </div>

      <div className="w-full max-w-md animate-fade-up rounded-2xl bg-gradient-to-br from-zinc-600 to-zinc-800 p-4 md:hidden">
        <div className="mx-auto w-full max-w-md">
          <CreateLink />
        </div>
      </div>

      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent" />
    </div>
  )
}

export default Hero
