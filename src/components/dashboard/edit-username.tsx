import { useSession } from 'next-auth/react'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { useUpdateUsername } from '@/hooks/api/user'
import { CHAR_SIZE_LIMIT } from '@/lib/constants'
import { isInvalidLength } from '@/lib/utils'

const EditUsername = ({ children }: { children: React.ReactNode }) => {
  const { data: session, update } = useSession()

  const [username, setUsername] = useState(session?.user?.username || '')
  const [open, setOpen] = useState(false)

  const {
    mutate: updateUsernameMutation,
    isPending: isUpdateUsernameMutationLoading
  } = useUpdateUsername({
    onError: (error) => toast.error(error.message),
    onSuccess: (success) => {
      setOpen(false)
      update({ username: success?.data?.username })
      toast.success(success.message)
    }
  })

  const usernameRequirements = [
    { label: 'Lowercase Letters', code: '[a - z]' },
    { label: 'Uppercase Letters', code: '[A - Z]' },
    { label: 'Numbers', code: '[0 - 9]' },
    { label: 'Dots', code: '[.]' },
    { label: 'Underscores', code: '[_]' },
    {
      label: `Length: Min ${CHAR_SIZE_LIMIT.USERNAME.MIN}, Max ${CHAR_SIZE_LIMIT.USERNAME.MAX} characters`
    }
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="sm:max-w-[425px]">
        <SheetHeader>
          <SheetTitle className="text-xl tracking-wide">
            Edit Your Username
          </SheetTitle>
          <SheetDescription className="pb-4 text-lg/5">
            Make changes to your username here.
          </SheetDescription>
          <div className="flex flex-col gap-2 rounded-lg border bg-zinc-50 px-4 py-2">
            <p className="text-left font-medium">Usernames can only have:</p>
            <ul className="list-inside list-disc text-left text-base/5">
              {usernameRequirements.map(({ label, code }) => (
                <li key={label}>
                  {label} {code && <code>{code}</code>}
                </li>
              ))}
            </ul>
          </div>
        </SheetHeader>
        <div className="my-4 flex w-full flex-col gap-2">
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
        <SheetFooter className="mt-10 flex sm:justify-start">
          <Button
            className="w-full"
            size="lg"
            variant="secondary"
            onClick={() => {
              setUsername(session?.user?.username || '')
              setOpen(false)
            }}
          >
            Cancel
          </Button>
          <Button
            className="w-full"
            disabled={
              isUpdateUsernameMutationLoading ||
              isInvalidLength(username, CHAR_SIZE_LIMIT.USERNAME)
            }
            size="lg"
            type="submit"
            onClick={() =>
              updateUsernameMutation({ username: username.trim() })
            }
          >
            {isUpdateUsernameMutationLoading ? 'Saving...' : 'Save'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default EditUsername
