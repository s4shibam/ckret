'use client'

import { SquareArrowOutUpRight } from 'lucide-react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { GoogleSignInButton } from '@/components/common/google-signin-button'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const handleAnonymousSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        username: formData.username,
        password: formData.password,
        callbackUrl: '/dashboard/profile',
        redirect: false
      })

      if (result?.error) {
        toast.error('Invalid username or password')
        return
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-medium">Sign In</CardTitle>
        <CardDescription className="text-lg">
          Sign in to send and receive anonymous messages
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <GoogleSignInButton text="Sign In with Google" />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleAnonymousSignIn}>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              disabled={isLoading}
              id="username"
              placeholder="Enter your username"
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              disabled={isLoading}
              id="password"
              placeholder="Enter your password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <Button
            className="w-full text-lg"
            disabled={isLoading}
            size="lg"
            type="submit"
          >
            Sign In Anonymously
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Don&apos;t have an account?
            </span>
          </div>
        </div>

        <Button
          asChild
          className="h-12 w-full bg-gradient-to-r from-ckret-primary to-ckret-secondary text-lg capitalize hover:opacity-90"
        >
          <Link href="/create-account">
            <SquareArrowOutUpRight className="mr-2" /> Create your own link
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
