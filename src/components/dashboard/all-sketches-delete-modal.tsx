import { ReactNode, useState } from 'react'
import toast from 'react-hot-toast'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@components/ui/alert-dialog'

import { useDeleteAllSketches } from '@api-hooks/sketch'

interface AllSketchesDeleteModalProps {
  children: ReactNode
}

const AllSketchesDeleteModal = ({ children }: AllSketchesDeleteModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const { mutate: deleteAllSketches } = useDeleteAllSketches({
    onSuccess: (success: any) => {
      toast.success(success.message)
      setIsDeleting(false)
    },
    onError: (error: any) => {
      toast.error(error.message)
      setIsDeleting(false)
    }
  })

  const handleDeleteAll = () => {
    setIsDeleting(true)
    deleteAllSketches()
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600"
            onClick={handleDeleteAll}
          >
            {isDeleting ? 'Deleting...' : 'Delete All'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AllSketchesDeleteModal
