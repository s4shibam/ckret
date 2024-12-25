import { ReactNode } from 'react'
import toast from 'react-hot-toast'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { useDeleteAllMessages } from '@/hooks/api/message'
import { invalidateQueries } from '@/lib/query-client'

type AllMessageDeleteModalProps = {
  children: ReactNode
}

const AllMessageDeleteModal = ({ children }: AllMessageDeleteModalProps) => {
  const {
    mutate: deleteAllMessagesMutation,
    isPending: isDeleteAllMessagesLoading
  } = useDeleteAllMessages({
    onError: (error) => toast.error(error.message),
    onSuccess: (success) => {
      toast.success(success.message)
      invalidateQueries(['get-all-messages'])
    }
  })

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete all your
            messages and remove them from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600"
            onClick={() => deleteAllMessagesMutation()}
          >
            {isDeleteAllMessagesLoading ? 'Deleting...' : 'Delete All'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AllMessageDeleteModal
