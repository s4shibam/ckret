import { useState } from 'react'
import toast from 'react-hot-toast'

import { CHAR_SIZE_LIMIT } from '@lib/constants'
import { isInvalidLength } from '@lib/utils'

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
            <div className="mt-4 flex flex-col gap-2 rounded-lg bg-gray-100 px-4 py-2">
              <p className="font-medium">Usernames can only have:</p>
              <ul className="list-inside list-disc text-base/5">
                <li>
                  Lowercase Letters <code>[a - z]</code>
                </li>
                <li>
                  Uppercase Letters <code>[A - Z]</code>
                </li>
                <li>
                  Numbers <code>[0 - 9]</code>
                </li>
                <li>
                  Dots <code>[.]</code>
                </li>
                <li>
                  Underscores <code>[_]</code>
                </li>
                <li>Length: Minimum 5, Maximum 20 characters</li>
              </ul>
            </div>
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
            disabled={
              isUpdateUsernameMutationLoading ||
              isInvalidLength(username, CHAR_SIZE_LIMIT.USERNAME)
            }
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
