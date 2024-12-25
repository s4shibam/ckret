import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
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
import { useUpdateAvatar } from '@/hooks/api/user'

const EditAvatar = ({ children }: { children: React.ReactNode }) => {
  const { data: session, update } = useSession()
  const [avatar, setAvatar] = useState(session?.user?.avatar || '')
  const [open, setOpen] = useState(false)

  const {
    mutate: updateAvatarMutation,
    isLoading: isUpdateAvatarMutationLoading
  } = useUpdateAvatar({
    onError: (error: any) => toast.error(error.message),

    onSuccess: (success: any) => {
      setOpen(false)
      update({ avatar: success?.data?.avatar })
      toast.success(success.message)
    }
  })

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="sm:max-w-[27.5rem]">
        <SheetHeader>
          <SheetTitle className="text-xl tracking-wide">
            Edit Your Avatar
          </SheetTitle>
          <SheetDescription className="text-lg/5">
            Select an emoji to use as your avatar.
          </SheetDescription>
        </SheetHeader>

        <div className="my-2 flex w-full flex-col gap-2">
          <Label className="text-lg" htmlFor="avatar">
            <p className="mt-2 text-lg font-normal">
              Selected Avatar: {avatar || session?.user?.avatar || 'None'}
            </p>
          </Label>
          <Picker
            data={data}
            icons="outline"
            maxFrequentRows={0}
            perLine={10}
            previewPosition="none"
            skinTonePosition="none"
            theme="light"
            onEmojiSelect={(emoji: any) => setAvatar(emoji.native)}
          />
        </div>

        <SheetFooter className="mt-10 flex sm:justify-start">
          <Button
            className="w-full"
            size="lg"
            variant="secondary"
            onClick={() => {
              setAvatar(session?.user?.avatar || '')
              setOpen(false)
            }}
          >
            Cancel
          </Button>
          <Button
            className="w-full"
            disabled={isUpdateAvatarMutationLoading}
            size="lg"
            type="submit"
            onClick={() => updateAvatarMutation({ avatar: avatar.trim() })}
          >
            {isUpdateAvatarMutationLoading ? 'Saving...' : 'Save'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default EditAvatar
