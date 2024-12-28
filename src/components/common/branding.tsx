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
        className="-ml-0.5 aspect-square size-8 sm:ml-0 sm:size-12"
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
