import Image from 'next/image'

import HERO from '@assets/hero.webp'

const Hero = () => {
  return (
    <div className="doodle relative flex size-full min-h-screen flex-col items-center gap-10 overflow-hidden border-b-2 border-ckret-primary px-6 pt-28">
      <div className="mt-auto flex select-none flex-col gap-4 tracking-widest drop-shadow-xl">
        <p className="animate-fade-up overflow-hidden text-center text-5xl font-extrabold uppercase sm:text-7xl lg:text-8xl">
          Speak Your{' '}
          <span className="bg-gradient-to-br from-orange-500 to-rose-500 bg-clip-text text-transparent">
            Mind
          </span>
        </p>
        <p className="animate-fade-up overflow-hidden text-center text-5xl font-extrabold uppercase sm:text-7xl lg:text-8xl">
          Keep Your{' '}
          <span className="bg-gradient-to-br from-lime-500 to-teal-500 bg-clip-text text-transparent">
            Identity
          </span>
        </p>
      </div>
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent" />
      <Image
        alt="Image by Freepik"
        className="relative size-[350px] animate-fade-up drop-shadow-lg sm:size-[400px] lg:size-[450px]"
        height={450}
        src={HERO}
        width={450}
      />
    </div>
  )
}

export default Hero
