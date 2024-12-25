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
import { useDeleteAllSketches } from '@/hooks/api/sketch'
import { invalidateQueries } from '@/lib/query-client'

interface AllSketchesDeleteModalProps {
  children: ReactNode
}

const AllSketchesDeleteModal = ({ children }: AllSketchesDeleteModalProps) => {
  const { mutate: deleteAllSketches, isPending: isDeleteAllSketchesPending } =
    useDeleteAllSketches({
      onSuccess: (success) => {
        toast.success(success.message)
        invalidateQueries(['get-all-sketches'])
      },
      onError: (error) => {
        toast.error(error.message)
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
            sketches and remove them from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600"
            onClick={() => deleteAllSketches()}
          >
            {isDeleteAllSketchesPending ? 'Deleting...' : 'Delete All'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AllSketchesDeleteModal
