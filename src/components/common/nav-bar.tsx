'use client'

import { LayoutDashboard, LogIn } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { Button } from '@components/ui/button'

import Branding from './branding'
import SignInModal from './signin-modal'

const NavBar = () => {
  const session = useSession()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 75) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-10 h-16 bg-transparent">
      <div
        className={`fixed inset-x-0 top-0 border-b bg-white shadow-sm transition-all duration-500 ease-in-out ${
          scrolled ? 'h-16' : 'h-0'
        }`}
      />
      <div className="relative mx-auto flex h-full w-full max-w-7xl items-center justify-between px-5">
        <Branding />
        {(session.status === 'loading' ||
          session.status === 'unauthenticated') && (
          <SignInModal>
            <Button className="h-11 text-xl">
              <LogIn className="mr-2" />
              Sign In
            </Button>
          </SignInModal>
        )}
        {session.status === 'authenticated' && (
          <Button asChild className="h-11 text-xl">
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
