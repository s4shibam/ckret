'use client'

import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { GoogleSignInButton } from '@/components/common/google-signin-button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
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
import { useAnonymousSignUp } from '@/hooks/api/user'

const CreateAccountPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })

  const { mutateAsync: signUp } = useAnonymousSignUp({
    onSuccess: (success) => {
      toast.success(success.message)
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setIsLoading(true)
    try {
      await signUp({
        username: formData.username,
        password: formData.password
      })

      const result = await signIn('credentials', {
        username: formData.username,
        password: formData.password,
        redirect: false
      })

      if (result?.error) {
        toast.error('Failed to sign in after account creation')
        return
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to create account. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-medium">Create Account</CardTitle>
        <CardDescription className="text-lg">
          Create an account to receive secret messages
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

        <form className="space-y-4" onSubmit={handleCreateAccount}>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              disabled={isLoading}
              id="username"
              placeholder="Choose a username"
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
              placeholder="Create a password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              disabled={isLoading}
              id="confirmPassword"
              placeholder="Confirm your password"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
          </div>
          <Alert className="border-amber-300 bg-amber-50" variant="destructive">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <AlertTitle className="text-amber-700">Important Notice</AlertTitle>
            <AlertDescription className="text-amber-600">
              Password recovery is not available for username/password accounts.
              Please remember your credentials as they cannot be recovered if
              forgotten. Google Sign-in accounts are not affected.
            </AlertDescription>
          </Alert>
          <Button
            className="w-full text-lg"
            disabled={isLoading}
            size="lg"
            type="submit"
          >
            Create Account
          </Button>
        </form>

        <div className="space-x-1 text-center">
          <span>Already have an account?</span>
          <Button asChild className="p-0 text-base" variant="link">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default CreateAccountPage
