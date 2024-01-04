import { useState } from 'react'
import toast from 'react-hot-toast'

import { invalidateQueries } from '@lib/query-client'

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

import { useDeleteAllMessages } from '@api-hooks/message'

const AllMessageDeleteModal = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false)
  const {
    mutate: deleteAllMessagesMutation,
    isLoading: isDeleteAllMessagesLoading
  } = useDeleteAllMessages({
    onError: (error: any) => toast.error(error.message),
    onSuccess: (success: any) => {
      toast.success(success.message)
      setOpen(false)
      invalidateQueries('get-all-messages')
    }
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="top-10 translate-y-0 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl tracking-wide">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription className="text-lg/5">
            This action cannot be undone. This will permanently delete all your
            messages and remove them from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="mt-4 text-xl"
            disabled={isDeleteAllMessagesLoading}
            type="submit"
            onClick={() => deleteAllMessagesMutation()}
          >
            {isDeleteAllMessagesLoading ? 'Deleting...' : 'Continue'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AllMessageDeleteModal
