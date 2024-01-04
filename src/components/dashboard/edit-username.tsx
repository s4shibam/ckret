import { useState } from 'react'
import toast from 'react-hot-toast'

import { Button } from '@components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@components/ui/dialog'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'

import { useUpdateUsername } from '@api-hooks/user'

const EditUsername = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState('')
  const [open, setOpen] = useState(false)

  const {
    mutate: updateUsernameMutation,
    isLoading: isUpdateUsernameMutationLoading
  } = useUpdateUsername({
    onError: (error: any) => toast.error(error.message),

    onSuccess: (success: any) => {
      setOpen(false)
      toast.success(success.message)
    }
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="top-10 translate-y-0 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl tracking-wide">
            Edit Your Username
          </DialogTitle>
          <DialogDescription className="text-lg/5">
            Make changes to your username here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="my-2 flex w-full flex-col gap-2">
          <Label className="text-lg" htmlFor="username">
            New Username
          </Label>
          <Input
            className="text-lg"
            id="username"
            placeholder="Enter new username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button
            className="text-xl"
            disabled={isUpdateUsernameMutationLoading}
            type="submit"
            onClick={() => updateUsernameMutation({ username })}
          >
            {isUpdateUsernameMutationLoading ? 'Saving...' : 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditUsername
