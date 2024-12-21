import EmojiPicker from 'emoji-picker-react'
import { useSession } from 'next-auth/react'
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
import { Label } from '@components/ui/label'

import { useUpdateAvatar } from '@api-hooks/user'

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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="top-10 translate-y-0 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl tracking-wide">
            Edit Your Avatar
          </DialogTitle>
          <DialogDescription className="text-lg/5">
            Select an emoji to use as your avatar. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="my-2 flex w-full flex-col gap-2">
          <Label className="text-lg" htmlFor="avatar">
            Avatar
          </Label>
          <EmojiPicker
            skinTonesDisabled
            onEmojiClick={(emoji) => setAvatar(emoji.emoji)}
          />
          <div className="mt-2 text-lg">
            Selected Avatar: <span>{avatar}</span>
          </div>
        </div>
        <DialogFooter className="flex justify-start">
          <Button
            className="text-xl"
            disabled={isUpdateAvatarMutationLoading}
            type="submit"
            onClick={() => updateAvatarMutation({ avatar: avatar.trim() })}
          >
            {isUpdateAvatarMutationLoading ? 'Saving...' : 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditAvatar
