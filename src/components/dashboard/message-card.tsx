import { formatDistanceToNow } from 'date-fns'
import { Expand, Delete, Loader } from 'lucide-react'
import Image from 'next/image'
import toast from 'react-hot-toast'

import { IMessage } from '@_types/types'

import LOGO_SECONDARY from '@assets/logo-secondary.svg'

import { invalidateQueries } from '@lib/query-client'

import { useDeleteSingleMessage } from '@api-hooks/message'

import MessageFullScreenView from './message-fullscreen-view'

type Props = {
  message: IMessage
}

const MessageCard = ({ message }: Props) => {
  const {
    mutate: deleteSingleMessageMutation,
    isLoading: isDeleteSingleMessageLoading
  } = useDeleteSingleMessage({
    onError: (error: any) => toast.error(error.message),

    onSuccess: (success: any) => {
      toast.success(success.message)
      invalidateQueries('get-all-messages')
    }
  })

  return (
    <div
      key={message._id}
      className="group relative flex flex-col justify-between gap-4 rounded-lg bg-gray-200 p-4"
    >
      <div className="grid grid-cols-[60px_1fr] items-center gap-4">
        <Image
          alt=""
          className="rounded-md"
          height={60}
          src={LOGO_SECONDARY}
          width={60}
        />
        <p className="line-clamp-2 w-full pr-6 text-lg">{message.content}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="mt-auto rounded-md bg-gray-300 px-2 py-1 capitalize">
          {formatDistanceToNow(message.createdAt, { addSuffix: true })}
        </p>
        <MessageFullScreenView messageContent={message.content}>
          <div title="Full Screen">
            <Expand className="absolute right-4 top-4 h-5 w-5 cursor-pointer text-ckret-secondary" />
          </div>
        </MessageFullScreenView>
        <div title="Delete">
          {isDeleteSingleMessageLoading ? (
            <Loader className="animate-spin" />
          ) : (
            <Delete
              className="cursor-pointer text-red-500 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={() => deleteSingleMessageMutation({ mid: message._id })}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default MessageCard
