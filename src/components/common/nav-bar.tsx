'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import Branding from './branding'

import { Button } from '@/components/ui/button'

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
    <div className="fixed inset-x-0 top-0 z-50 h-16 bg-transparent">
      <div
        className={`fixed inset-x-0 top-0 border-b bg-white shadow-sm transition-all duration-500 ease-in-out ${
          scrolled ? 'h-16' : 'h-0'
        }`}
      />

      <div className="relative mx-auto flex h-full w-full max-w-7xl items-center justify-between px-6">
        <Branding className="animate-fade-right animate-delay-150" />

        {session.status !== 'loading' && (
          <Button
            asChild
            className="animate-fade-left rounded-full px-6 text-base sm:h-11 sm:text-lg"
          >
            <Link
              href={
                session.status === 'authenticated'
                  ? '/dashboard/profile'
                  : '/sign-in'
              }
            >
              {session.status === 'authenticated' ? 'Dashboard' : 'Sign In'}
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}

export default NavBar
