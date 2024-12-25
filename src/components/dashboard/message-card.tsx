import { formatDistanceToNow } from 'date-fns'
import { Clock, Loader, Reply, X } from 'lucide-react'
import Image from 'next/image'
import toast from 'react-hot-toast'

import MessageFullScreenView from './message-fullscreen-view'

import LOGO_SECONDARY from '@/assets/logo-secondary.svg'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useDeleteSingleMessage } from '@/hooks/api/message'
import { invalidateQueries } from '@/lib/query-client'
import { TMessage } from '@/types/index'

type MessageCardProps = {
  message: TMessage
}

const MessageCard = ({ message }: MessageCardProps) => {
  const {
    mutate: deleteSingleMessageMutation,
    isPending: isDeleteSingleMessageLoading
  } = useDeleteSingleMessage({
    onError: (error) => toast.error(error.message),
    onSuccess: (success) => {
      toast.success(success.message)
      invalidateQueries(['get-all-messages'])
    }
  })

  return (
    <Card className="group relative space-y-4 overflow-hidden bg-gradient-to-r from-white to-zinc-100 p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex flex-col items-start gap-4 sm:flex-row">
        <div className="relative shrink-0 overflow-hidden rounded-lg">
          <Image
            alt="Message avatar"
            className="h-12 w-12 transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14"
            height={48}
            src={LOGO_SECONDARY}
            width={48}
          />
          {message.show_in_profile && (
            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
          )}
        </div>

        <p className="line-clamp-2 flex-1 text-base leading-relaxed text-zinc-800">
          {message.content}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex w-full items-center gap-1">
          <Clock className="h-4 w-4 text-zinc-500" />
          <p className="line-clamp-1 flex-1 text-sm capitalize text-zinc-600">
            {formatDistanceToNow(message.createdAt, { addSuffix: true })}
          </p>
        </div>

        <div className="flex shrink-0 gap-1">
          <MessageFullScreenView message={message}>
            <Button
              className="h-fit bg-zinc-200 p-1 hover:bg-zinc-300"
              title="Reply"
              variant="ghost"
            >
              <Reply className="size-5" />
            </Button>
          </MessageFullScreenView>

          <Button
            className="h-fit bg-zinc-200 p-1 hover:bg-zinc-300"
            disabled={isDeleteSingleMessageLoading}
            title="Delete"
            variant="ghost"
            onClick={() => deleteSingleMessageMutation({ mid: message._id })}
          >
            {isDeleteSingleMessageLoading ? (
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

export default MessageCard
