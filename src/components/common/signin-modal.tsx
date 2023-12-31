import Image from 'next/image'
import { signIn } from 'next-auth/react'

import GOOGLE from '@assets/google.svg'

import { Button } from '@components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@components/ui/dialog'

const SignInModal = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-9/10 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">Sign In</DialogTitle>
          <DialogDescription className="text-lg">
            Sign in to send and receive anonymous messages.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-5">
          <Button className="w-full" size="lg" onClick={() => signIn('google')}>
            <Image
              alt=""
              className="mr-2 h-8 w-8"
              height={65}
              src={GOOGLE}
              width={65}
            />
            <span className="text-xl">Sign In with Google</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SignInModal
