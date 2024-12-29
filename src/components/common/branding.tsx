import Image from 'next/image'
import Link from 'next/link'

import LOGO from '@/assets/logo-animated.svg'
import { cn } from '@/lib/utils'

const Branding = ({ className }: { className?: string }) => {
  return (
    <Link
      className={cn('flex h-[2.3rem] w-fit items-center gap-1', className)}
      href="/"
    >
      <Image
        alt="Logo"
        className="-ml-0.5 aspect-square size-10 sm:ml-0 sm:size-[3.25rem]"
        height={50}
        src={LOGO}
        width={50}
      />
      <p className="text-3xl font-bold tracking-wide sm:text-[2rem]">
        Ckret<span className="text-ckret-secondary">.</span>
      </p>
    </Link>
  )
}

export default Branding
