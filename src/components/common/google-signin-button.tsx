'use client'

import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import toast from 'react-hot-toast'

import GOOGLE from '@assets/google.svg'

import { Button } from '@components/ui/button'

interface GoogleSignInButtonProps {
  text: string
}

export function GoogleSignInButton({ text }: GoogleSignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn('google', { callbackUrl: '/dashboard/profile', redirect: false })
    } catch (error) {
      toast.error('Failed to sign in with Google. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      className="w-full"
      disabled={isLoading}
      size="lg"
      variant="outline"
      onClick={handleGoogleSignIn}
    >
      <Image
        alt="Google"
        className="mr-2 h-8 w-8"
        height={65}
        src={GOOGLE}
        width={65}
      />
      <span className="text-xl">{text}</span>
    </Button>
  )
}
