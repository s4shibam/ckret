import Image from 'next/image'
import Link from 'next/link'

import LOGO from '@assets/logo-animated.svg'

const Branding = () => {
  return (
    <Link className="flex h-[2.5rem] items-center gap-1" href="/">
      <Image
        alt=""
        className="-ml-1 aspect-square size-[2rem] sm:ml-0 sm:size-[3rem]"
        height={50}
        src={LOGO}
        width={50}
      />
      <p className="text-[1.5rem] font-bold tracking-wider sm:text-[1.75rem]">
        Ckret.
      </p>
    </Link>
  )
}

export default Branding
