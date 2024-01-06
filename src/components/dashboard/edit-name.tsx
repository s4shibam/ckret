import { useSession } from 'next-auth/react'
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

import { useUpdateName } from '@api-hooks/user'

const EditName = ({ children }: { children: React.ReactNode }) => {
  const { data: session, update } = useSession()
  const [name, setName] = useState(session?.user?.name || '')
  const [open, setOpen] = useState(false)

  const { mutate: updateNameMutation, isLoading: isUpdateNameMutationLoading } =
    useUpdateName({
      onError: (error: any) => toast.error(error.message),

      onSuccess: (success: any) => {
        setOpen(false)
        update({ name: success?.data?.name })
        toast.success(success.message)
      }
    })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="top-10 translate-y-0 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl tracking-wide">
            Edit Your Name
          </DialogTitle>
          <DialogDescription className="text-lg/5">
            Make changes to your name here. Click save when you&apos;re done.
          </DialogDescription>
          <p className="mt-2 text-base/5">
            Note: Name length can not be more than{' '}
            <span className="font-medium">{CHAR_SIZE_LIMIT.NAME.MAX}</span>{' '}
            characters.
          </p>
        </DialogHeader>
        <div className="my-2 flex w-full flex-col gap-2">
          <Label className="text-lg" htmlFor="message">
            Name
          </Label>
          <Input
            className="text-lg"
            id="message"
            placeholder="Enter your name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button
            className="text-xl"
            disabled={
              isUpdateNameMutationLoading ||
              isInvalidLength(name, CHAR_SIZE_LIMIT.NAME)
            }
            type="submit"
            onClick={() => updateNameMutation({ name: name.trim() })}
          >
            {isUpdateNameMutationLoading ? 'Saving...' : 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditName
