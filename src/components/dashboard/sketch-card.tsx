import { formatDistanceToNow } from 'date-fns'
import { Expand, Loader2, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { ISketch } from '@_types/types'

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
import { Button } from '@components/ui/button'
import { Card } from '@components/ui/card'

import { useDeleteSingleSketch } from '@api-hooks/sketch'

import SketchFullScreenView from './sketch-fullscreen-view'

interface SketchCardProps {
  sketch: ISketch
  refetchSketches: () => void
}

const SketchCard = ({ sketch, refetchSketches }: SketchCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const { mutate: deleteSketch } = useDeleteSingleSketch({
    onSuccess: (success: any) => {
      toast.success(success.message)
      refetchSketches()
      setIsDeleting(false)
    },
    onError: (error: any) => {
      toast.error(error.message)
      setIsDeleting(false)
    }
  })

  const handleDelete = () => {
    setIsDeleting(true)
    deleteSketch({ sid: sketch._id })
  }

  return (
    <Card className="relative flex flex-col gap-4 overflow-hidden p-4">
      <SketchFullScreenView sketch={sketch}>
        <div className="relative aspect-square cursor-pointer overflow-hidden rounded-md">
          <Image
            alt={`Sketch ${sketch._id}`}
            className="rounded-md border object-cover"
            height={1000}
            src={sketch.sketch_url}
            width={1000}
          />
          <Expand className="absolute right-2 top-2 h-6 w-6 text-white" />
        </div>
      </SketchFullScreenView>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {formatDistanceToNow(new Date(sketch.createdAt), { addSuffix: true })}
        </p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="sm" variant="destructive">
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this sketch?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 hover:bg-red-600"
                onClick={handleDelete}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Card>
  )
}

export default SketchCard
