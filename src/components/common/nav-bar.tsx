'use client'

import { LayoutDashboard, LogIn } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

import LOGO from '@assets/animated-logo.svg'

import { Button } from '@components/ui/button'

import SignInModal from './signin-modal'

const NavBar = () => {
  const session = useSession()
  return (
    <div className="fixed inset-x-0 top-0 z-10 h-16 border-b bg-white px-5 shadow-sm">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between">
        <Link className="flex items-center gap-1" href="/">
          <Image alt="" height={50} src={LOGO} width={50} />
          <p className="text-2xl font-bold tracking-wide">Ckret</p>
        </Link>
        {(session.status === 'loading' ||
          session.status === 'unauthenticated') && (
          <SignInModal>
            <Button className="text-xl">
              <LogIn className="mr-2" />
              Sign In
            </Button>
          </SignInModal>
        )}
        {session.status === 'authenticated' && (
          <Button asChild className="text-xl">
            <Link href="/dashboard/profile">
              <LayoutDashboard className="mr-2" />
              Dashboard
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}

export default NavBar
