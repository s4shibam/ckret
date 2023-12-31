import Image from 'next/image'
import Link from 'next/link'

import LOGO from '@assets/animated-logo.svg'

const Branding = () => {
  return (
    <Link className="flex items-center gap-1" href="/">
      <Image alt="" height={50} src={LOGO} width={50} />
      <p className="text-2xl font-semibold tracking-wide">Ckret</p>
    </Link>
  )
}

export default Branding
