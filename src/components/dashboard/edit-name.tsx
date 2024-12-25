import { useSession } from 'next-auth/react'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { CHAR_SIZE_LIMIT } from '@lib/constants'
import { isInvalidLength } from '@lib/utils'

import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@components/ui/sheet'

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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="sm:max-w-[425px]">
        <SheetHeader>
          <SheetTitle className="text-xl tracking-wide">
            Edit Your Name
          </SheetTitle>
          <SheetDescription className="text-lg/5">
            Make changes to your name here.
          </SheetDescription>
          <p className="mt-2 text-base/5">
            Note: Name length can not be more than{' '}
            <span className="font-medium">{CHAR_SIZE_LIMIT.NAME.MAX}</span>{' '}
            characters.
          </p>
        </SheetHeader>
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
        <SheetFooter className="mt-10 flex sm:justify-start">
          <Button
            className="w-full"
            size="lg"
            variant="secondary"
            onClick={() => {
              setName(session?.user?.name || '')
              setOpen(false)
            }}
          >
            Cancel
          </Button>
          <Button
            className="w-full"
            disabled={
              isUpdateNameMutationLoading ||
              isInvalidLength(name, CHAR_SIZE_LIMIT.NAME)
            }
            size="lg"
            type="submit"
            onClick={() => updateNameMutation({ name: name.trim() })}
          >
            {isUpdateNameMutationLoading ? 'Saving...' : 'Save'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default EditName
