import Image from 'next/image'
import Link from 'next/link'

import LOGO from '@assets/logo-animated.svg'

const Branding = () => {
  return (
    <Link className="flex items-center gap-1" href="/">
      <Image
        alt=""
        className="-ml-1 aspect-square h-[40px] w-[40px] sm:ml-0 sm:h-[50px] sm:w-[50px]"
        height={50}
        src={LOGO}
        width={50}
      />
      <p className="text-[25px] font-bold tracking-wider sm:text-3xl">Ckret.</p>
    </Link>
  )
}

export default Branding
