'use client'

import { LayoutDashboard, LogIn } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { Button } from '@components/ui/button'

import Branding from './branding'
import SignInModal from './signin-modal'

const NavBar = () => {
  const session = useSession()
  return (
    <div className="fixed inset-x-0 top-0 z-10 h-16 border-b bg-white shadow-sm">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-5">
        <Branding />
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
