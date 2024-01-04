import Image from 'next/image'

import LOADER from '@assets/loader.svg'

import { cn } from '@lib/utils'

type Props = {
  type?: 'fullscreen' | 'normal'
}

const AnimatedLoader = ({ type = 'normal' }: Props) => {
  const size = type === 'fullscreen' ? 200 : 100
  return (
    <div
      className={cn('grid place-items-center', {
        'h-screen bg-gray-50': type === 'fullscreen',
        'pt-[15%]': type === 'normal'
      })}
    >
      <Image alt="Loading..." height={size} src={LOADER} width={size} />
    </div>
  )
}

export default AnimatedLoader
