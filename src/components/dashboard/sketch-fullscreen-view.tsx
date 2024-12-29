import { format, formatDistanceToNow } from 'date-fns'
import { ArrowDown, Eye, EyeOff, Loader, Send, Share2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { env } from '../../lib/env'

import Watermark from './watermark'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useReplyToSketch, useToggleSketchVisibility } from '@/hooks/api/sketch'
import { useImageActions } from '@/hooks/use-image-actions'
import { invalidateQueries } from '@/lib/query-client'
import { TSketch } from '@/types/index'

type Props = {
  children: React.ReactNode
  sketch: TSketch
}

const FILE_NAME = `ckret-sketch-${format(
  new Date(),
  'yyyy-MM-dd-HH-mm-ss'
)}.png`

const SketchFullScreenView = ({ sketch, children }: Props) => {
  const { data: session } = useSession()
  const imageRef = useRef<HTMLDivElement>(null)
  const [reply, setReply] = useState(sketch.reply || '')

  const { handleSaveImage, handleShareImage } = useImageActions({
    fileName: FILE_NAME,
    ref: imageRef
  })

  const { mutate: replyToSketchMutation, isPending: isReplyLoading } =
    useReplyToSketch({
      onError: (error) => toast.error(error.message),
      onSuccess: (success) => {
        toast.success(success.message)
        invalidateQueries(['get-all-sketches'])
      }
    })

  const {
    mutate: toggleVisibilityMutation,
    isPending: isToggleVisibilityLoading
  } = useToggleSketchVisibility({
    onError: (error) => toast.error(error.message),
    onSuccess: (success) => {
      toast.success(success.message)
      invalidateQueries(['get-all-sketches'])
    }
  })

  const handleReply = () => {
    if (!reply.trim()) {
      toast.error('Reply content is required')
      return
    }
    replyToSketchMutation({
      sid: sketch._id,
      replyContent: reply.trim()
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="h-[95vh] max-h-[60rem] max-w-4xl px-5 py-10 md:px-8">
        <div className="flex h-full w-full flex-col gap-4">
          <div
            ref={imageRef}
            className="relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-zinc-200/80 bg-gradient-to-b from-white to-zinc-50/50 font-outfit shadow-sm backdrop-blur-sm transition-all"
          >
            <div className="flex items-center gap-3 border-b border-zinc-200/80 p-2 sm:p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-ckret-primary to-ckret-secondary text-white">
                <span className="text-base font-medium">A</span>
              </div>
              <div>
                <h3 className="font-medium leading-4 text-zinc-900">
                  Anonymous
                </h3>
                <p className="text-sm capitalize text-zinc-500">
                  {formatDistanceToNow(sketch.createdAt, {
                    addSuffix: true
                  })}
                </p>
              </div>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto p-4">
              <div className="relative aspect-square h-3/4 max-h-[20rem] overflow-hidden rounded-2xl rounded-bl-none bg-gradient-to-r from-ckret-primary/10 to-ckret-secondary/10 p-2 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={`Sketch ${sketch._id}`}
                  className="aspect-square size-full rounded-xl bg-white object-cover"
                  crossOrigin="anonymous"
                  height={500}
                  src={sketch.sketch_url}
                  width={500}
                />
              </div>

              <div className="flex flex-col items-end gap-1">
                <div className="relative w-full max-w-[75%]">
                  <textarea
                    className="h-[7rem] w-full resize-none overflow-auto rounded-2xl rounded-br-none border-0 bg-zinc-100 p-3 text-base leading-relaxed text-zinc-700 shadow-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-ckret-primary/20 focus:ring-offset-2 focus:ring-offset-white"
                    placeholder="Write your reply here..."
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Watermark
              url={`${env.ckret_url}/@${session?.user?.username}/skc`}
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-2">
              <Button
                className="bg-zinc-100 hover:bg-zinc-200"
                variant="ghost"
                onClick={handleSaveImage}
              >
                <ArrowDown className="size-4" />
                <span className="ml-2 hidden sm:block">Save</span>
              </Button>
              <Button
                className="bg-zinc-100 hover:bg-zinc-200"
                variant="ghost"
                onClick={handleShareImage}
              >
                <Share2 className="size-4" />
                <span className="ml-2 hidden sm:block">Share</span>
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                disabled={isToggleVisibilityLoading}
                title={
                  sketch.show_in_profile
                    ? 'Hide from profile'
                    : 'Show in profile'
                }
                variant="outline"
                onClick={() => toggleVisibilityMutation({ sid: sketch._id })}
              >
                {isToggleVisibilityLoading ? (
                  <Loader className="size-5 animate-spin" />
                ) : sketch.show_in_profile ? (
                  <Eye className="size-5 text-green-500" />
                ) : (
                  <EyeOff className="size-5 text-red-500" />
                )}
              </Button>

              <Button
                className="bg-ckret-primary hover:bg-ckret-primary/90"
                disabled={isReplyLoading || !reply.trim()}
                onClick={handleReply}
              >
                {isReplyLoading ? (
                  <Loader className="size-4 animate-spin" />
                ) : (
                  <Send className="size-4" />
                )}
                <span className="ml-2 hidden sm:block">Save Reply</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SketchFullScreenView
