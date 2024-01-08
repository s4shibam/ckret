import Image from 'next/image'

import HERO from '@assets/hero.webp'

const Hero = () => {
  return (
    <div className="doodle relative flex min-h-screen w-full flex-col items-center justify-center gap-10 overflow-hidden border-b-2 border-ckret-primary px-6 pt-16">
      <div className="flex select-none flex-col gap-4 pt-20 tracking-widest drop-shadow-xl">
        <p className="animate-fade-up overflow-hidden text-center text-6xl font-bold uppercase sm:text-7xl lg:text-8xl">
          Speak Your{' '}
          <span className="bg-gradient-to-br from-orange-500 to-rose-500 bg-clip-text text-transparent">
            Mind
          </span>
        </p>
        <p className="animate-fade-up overflow-hidden text-center text-6xl font-bold uppercase sm:text-7xl lg:text-8xl">
          Keep Your{' '}
          <span className="bg-gradient-to-br from-lime-500 to-teal-500 bg-clip-text text-transparent">
            Identity
          </span>
        </p>
      </div>
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent" />
      <Image
        alt="Image by Freepik"
        // eslint-disable-next-line tailwindcss/classnames-order
        className="relative mt-auto animate-fade-up drop-shadow-lg"
        height={550}
        src={HERO}
        width={550}
      />
    </div>
  )
}

export default Hero
