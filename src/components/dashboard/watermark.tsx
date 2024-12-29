import Image from 'next/image'

import LOGO_SECONDARY from '@/assets/logo-secondary.svg'
import { env } from '@/lib/env'
import { cn } from '@/lib/utils'

type WatermarkProps = {
  url?: string
  className?: string
}

const Watermark = ({ url = env.ckret_url, className }: WatermarkProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-2 opacity-75',
        className
      )}
    >
      <div className="flex items-center gap-2">
        <Image
          alt="Logo"
          className="size-5 rounded"
          height={16}
          src={LOGO_SECONDARY}
          width={16}
        />
        <span className="text-xs text-zinc-500 sm:text-sm">{url}</span>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-zinc-400 sm:text-sm">
        Messages are encrypted.
      </div>
    </div>
  )
}

export default Watermark
