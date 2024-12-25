import { formatDistanceToNow } from 'date-fns'
import { Clock, Loader, Reply, X } from 'lucide-react'
import Image from 'next/image'
import toast from 'react-hot-toast'

import SketchFullScreenView from './sketch-fullscreen-view'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useDeleteSingleSketch } from '@/hooks/api/sketch'
import { invalidateQueries } from '@/lib/query-client'
import { ISketch } from '@/types/index'

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
      <div className="relative">
        <Image
          alt={`Sketch ${sketch._id}`}
          className="aspect-square rounded-md border object-cover"
          height={1000}
          src={sketch.sketch_url}
          width={1000}
        />

        {sketch.show_in_profile && (
          <div className="absolute right-2 top-2 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
        )}
      </div>

      <div className="grid grid-cols-[1fr_auto] items-center justify-between gap-2">
        <div className="flex w-full items-center gap-1">
          <Clock className="h-4 w-4 text-zinc-500" />
          <p className="line-clamp-1 flex-1 text-sm capitalize text-zinc-600">
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
              <Reply className="size-5" />
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
              <Loader className="size-5 animate-spin" />
            ) : (
              <X className="size-5 text-red-500" />
            )}
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default SketchCard
