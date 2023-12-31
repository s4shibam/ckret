import Image from 'next/image'

import HERO from '@assets/hero.webp'

const Hero = () => {
  return (
    <div className="graph-paper relative flex h-fit w-full flex-col items-center justify-center gap-10 overflow-hidden border-b-2 border-ckret-primary px-6">
      <div className="absolute top-1/3 h-[80vh] w-12 rotate-[15deg] bg-ckret-secondary blur-[100px] xl:w-16" />
      <div className="flex flex-col gap-4 pt-[10vh] drop-shadow-lg">
        <p className="animate-fade-up overflow-hidden text-center text-6xl font-bold uppercase xl:text-8xl">
          Speak Your{' '}
          <span className="bg-gradient-to-br from-orange-500 to-rose-500 bg-clip-text tracking-wider text-transparent">
            Mind
          </span>
        </p>
        <p className="animate-fade-up overflow-hidden text-center text-6xl font-bold uppercase xl:text-8xl">
          Keep Your{' '}
          <span className="bg-gradient-to-br from-lime-500 to-teal-500 bg-clip-text tracking-wider text-transparent">
            Identity
          </span>
        </p>
      </div>
      <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent" />
      <Image
        alt="Image by Freepik"
        // eslint-disable-next-line tailwindcss/classnames-order
        className="relative animate-fade-up drop-shadow-lg"
        height={500}
        src={HERO}
        width={500}
      />
    </div>
  )
}

export default Hero
