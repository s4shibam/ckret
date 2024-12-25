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
import { useUpdateFeedbackMessage } from '@/hooks/api/user'
import { CHAR_SIZE_LIMIT } from '@/lib/constants'
import { isInvalidLength } from '@/lib/utils'

const EditFeedbackMessage = ({ children }: { children: React.ReactNode }) => {
  const { data: session, update } = useSession()
  const [feedbackMessage, setFeedbackMessage] = useState(
    session?.user?.feedback_message || ''
  )
  const [open, setOpen] = useState(false)

  const {
    mutate: updateFeedbackMessageMutation,
    isPending: isUpdateFeedbackMessageMutationLoading
  } = useUpdateFeedbackMessage({
    onError: (error) => toast.error(error.message),
    onSuccess: (success) => {
      setOpen(false)
      update({ feedback_message: success?.data?.feedback_message })
      toast.success(success.message)
    }
  })

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="sm:max-w-[425px]">
        <SheetHeader>
          <SheetTitle className="text-xl tracking-wide">
            Edit Your Feedback Message
          </SheetTitle>
          <SheetDescription className="text-lg/5">
            Make changes to your feedback message here. Click save when
            you&apos;re done.
          </SheetDescription>
          <p className="mt-2 text-base/5">
            Note: Feedback message length can not be more than{' '}
            <span className="font-medium">
              {CHAR_SIZE_LIMIT.FEEDBACK_MESSAGE.MAX}
            </span>{' '}
            characters.
          </p>
        </SheetHeader>
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
        <SheetFooter className="mt-10 flex sm:justify-start">
          <Button
            className="w-full"
            size="lg"
            variant="secondary"
            onClick={() => {
              setFeedbackMessage(session?.user?.feedback_message || '')
              setOpen(false)
            }}
          >
            Cancel
          </Button>
          <Button
            className="w-full"
            disabled={
              isUpdateFeedbackMessageMutationLoading ||
              isInvalidLength(feedbackMessage, CHAR_SIZE_LIMIT.FEEDBACK_MESSAGE)
            }
            size="lg"
            type="submit"
            onClick={() =>
              updateFeedbackMessageMutation({
                feedbackMessage: feedbackMessage.trim()
              })
            }
          >
            {isUpdateFeedbackMessageMutationLoading ? 'Saving...' : 'Save'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default EditFeedbackMessage
