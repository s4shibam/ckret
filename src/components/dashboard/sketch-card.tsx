import { Clock, Loader2, Maximize2, Trash2 } from 'lucide-react'
import Image from 'next/image'
import toast from 'react-hot-toast'

import { ISketch } from '@_types/types'

import { invalidateQueries } from '@lib/query-client'

import { Button } from '@components/ui/button'
import { Card } from '@components/ui/card'

import { useDeleteSingleSketch } from '@api-hooks/sketch'

import { formatDistanceToNow } from 'date-fns'
import SketchFullScreenView from './sketch-fullscreen-view'

interface SketchCardProps {
  sketch: ISketch
}

const SketchCard = ({ sketch }: SketchCardProps) => {
  const {
    mutate: deleteSingleSketchMutation,
    isLoading: isDeleteSingleSketchLoading
  } = useDeleteSingleSketch({
    onSuccess: (success: any) => {
      toast.success(success.message)
      invalidateQueries('get-all-sketches')
    },
    onError: (error: any) => {
      toast.error(error.message)
    }
  })

  return (
    <Card className="group relative space-y-4 overflow-hidden bg-gradient-to-r from-white to-zinc-100 p-4 shadow-sm transition-all hover:shadow-md">
      <Image
        alt={`Sketch ${sketch._id}`}
        className="aspect-square rounded-md border object-cover"
        height={1000}
        src={sketch.sketch_url}
        width={1000}
      />

      <div className="grid grid-cols-[1fr_auto] items-center justify-between gap-4">
        <div className="flex w-full items-center gap-1">
          <Clock className="h-4 w-4 text-zinc-500" />
          <p className="max-w-28 truncate text-sm capitalize text-zinc-600">
            {formatDistanceToNow(sketch.createdAt, { addSuffix: true })}
          </p>
        </div>

        <div className="flex shrink-0 gap-1">
          <SketchFullScreenView sketch={sketch}>
            <Button
              className="h-fit bg-zinc-200 p-1 hover:bg-zinc-300"
              title="Reply"
              variant="ghost"
            >
              <Maximize2 className="size-5" />
            </Button>
          </SketchFullScreenView>

          <Button
            className="h-fit bg-zinc-200 p-1 hover:bg-zinc-300"
            disabled={isDeleteSingleSketchLoading}
            title="Delete"
            variant="ghost"
            onClick={() => deleteSingleSketchMutation({ sid: sketch._id })}
          >
            {isDeleteSingleSketchLoading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <Trash2 className="size-5 text-red-500" />
            )}
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default SketchCard
