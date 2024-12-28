import { format, formatDistanceToNow } from 'date-fns'
import html2canvas from 'html2canvas'
import { ArrowDown, Eye, EyeOff, Loader, Send, Share2 } from 'lucide-react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'

import LOGO_SECONDARY from '@/assets/logo-secondary.svg'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {
  useReplyToMessage,
  useToggleMessageVisibility
} from '@/hooks/api/message'
import { env } from '@/lib/env'
import { invalidateQueries } from '@/lib/query-client'
import { TMessage } from '@/types/index'

type Props = {
  children: React.ReactNode
  message: TMessage
}

const FILE_NAME = `ckret-message-${format(
  new Date(),
  'yyyy-MM-dd-HH-mm-ss'
)}.png`

const MessageFullScreenView = ({ message, children }: Props) => {
  const { data: session } = useSession()

  const imageRef = useRef<HTMLDivElement>(null)

  const [reply, setReply] = useState(message.reply || '')

  const { mutate: replyToMessageMutation, isPending: isReplyLoading } =
    useReplyToMessage({
      onError: (error) => toast.error(error.message),
      onSuccess: (success) => {
        toast.success(success.message)
        invalidateQueries(['get-all-messages'])
      }
    })

  const {
    mutate: toggleVisibilityMutation,
    isPending: isToggleVisibilityLoading
  } = useToggleMessageVisibility({
    onError: (error) => toast.error(error.message),
    onSuccess: (success) => {
      toast.success(success.message)
      invalidateQueries(['get-all-messages'])
    }
  })

  const handleReply = () => {
    if (!reply.trim()) {
      toast.error('Reply content is required')
      return
    }
    replyToMessageMutation({
      mid: message._id,
      replyContent: reply.trim()
    })
  }

  const handleSaveImage = async () => {
    if (imageRef.current) {
      try {
        await document.fonts.ready

        const canvas = await html2canvas(imageRef.current, { scale: 2 })
        const dataUrl = canvas.toDataURL('image/png')
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = FILE_NAME
        a.click()
      } catch (err) {
        toast.error('Unknown error occurred')
      }
    }
  }

  const handleShare = async () => {
    if (imageRef.current) {
      const canvas = await html2canvas(imageRef.current, { scale: 2 })
      const blobFile: Blob | null = await new Promise((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob)
        }, 'image/png')
      })

      if (!blobFile) {
        toast.error("Can't share, Download instead")
        return
      }

      const data = {
        files: [
          new File([blobFile], FILE_NAME, {
            type: blobFile.type
          })
        ]
      }

      try {
        if (!navigator.canShare(data)) {
          toast.error("Can't share, Download instead")
        }
        await navigator.share(data)
      } catch (err) {
        toast.error("Can't share, Download instead")
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="h-[95vh] max-h-[60rem] max-w-4xl p-4 sm:p-6 md:p-8">
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
                  {formatDistanceToNow(message.createdAt, {
                    addSuffix: true
                  })}
                </p>
              </div>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto p-4">
              <div className="flex flex-col items-start gap-1">
                <div className="max-w-[75%] rounded-2xl rounded-bl-none bg-gradient-to-r from-ckret-primary/10 to-ckret-secondary/10 p-4 shadow-sm">
                  <p className="whitespace-pre-wrap text-base leading-relaxed text-zinc-700">
                    {message.content}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                <textarea
                  className="h-full min-h-[7rem] w-3/4 max-w-md resize-none overflow-auto rounded-2xl rounded-br-none border-0 bg-zinc-100 p-3 text-base leading-relaxed text-zinc-700 shadow-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-ckret-primary/20 focus:ring-offset-2 focus:ring-offset-white"
                  placeholder="Write your reply here..."
                  value={reply}
                  onChange={(e) => {
                    setReply(e.target.value)
                    e.target.style.height = 'auto'
                    e.target.style.height = `${Math.min(
                      e.target.scrollHeight,
                      200
                    )}px`
                  }}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between border-t border-zinc-200 p-2">
              <div className="flex items-center gap-2">
                <Image
                  alt="Logo"
                  className="size-5 rounded"
                  height={16}
                  src={LOGO_SECONDARY}
                  width={16}
                />
                <span className="text-sm text-zinc-500">
                  {`${env.ckret_url}/@${session?.user?.username}/msg`}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-zinc-400">
                Messages are encrypted.
              </div>
            </div>
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
                onClick={handleShare}
              >
                <Share2 className="size-4" />
                <span className="ml-2 hidden sm:block">Share</span>
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                disabled={isToggleVisibilityLoading}
                title={
                  message.show_in_profile
                    ? 'Hide from profile'
                    : 'Show in profile'
                }
                variant="outline"
                onClick={() => toggleVisibilityMutation({ mid: message._id })}
              >
                {isToggleVisibilityLoading ? (
                  <Loader className="size-5 animate-spin" />
                ) : message.show_in_profile ? (
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
                <span className="ml-2 hidden sm:block">
                  {message.reply ? 'Update Reply' : 'Save Reply'}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MessageFullScreenView
