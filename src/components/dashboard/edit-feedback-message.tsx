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

import { useUpdateFeedbackMessage } from '@api-hooks/user'

const EditFeedbackMessage = ({ children }: { children: React.ReactNode }) => {
  const { update } = useSession()
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [open, setOpen] = useState(false)

  const {
    mutate: updateFeedbackMessageMutation,
    isLoading: isUpdateFeedbackMessageMutationLoading
  } = useUpdateFeedbackMessage({
    onError: (error: any) => toast.error(error.message),

    onSuccess: (success: any) => {
      setOpen(false)
      update({ feedback_message: success?.data?.feedback_message })
      toast.success(success.message)
    }
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="top-10 translate-y-0 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl tracking-wide">
            Edit Your Feedback Message
          </DialogTitle>
          <DialogDescription className="text-lg/5">
            Make changes to your feedback message here. Click save when
            you&apos;re done.
          </DialogDescription>
          <p className="mt-2 text-base/5">
            Note: Feedback message length can not be more than{' '}
            <span className="font-medium">100</span> characters.
          </p>
        </DialogHeader>
        <div className="my-2 flex w-full flex-col gap-2">
          <Label className="text-lg" htmlFor="message">
            New Message
          </Label>
          <Input
            className="text-lg"
            id="message"
            placeholder="Write the message"
            type="text"
            value={feedbackMessage}
            onChange={(e) => setFeedbackMessage(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button
            className="text-xl"
            disabled={
              isUpdateFeedbackMessageMutationLoading ||
              isInvalidLength(feedbackMessage, CHAR_SIZE_LIMIT.FEEDBACK_MESSAGE)
            }
            type="submit"
            onClick={() =>
              updateFeedbackMessageMutation({
                feedbackMessage: feedbackMessage.trim()
              })
            }
          >
            {isUpdateFeedbackMessageMutationLoading
              ? 'Saving...'
              : 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditFeedbackMessage
