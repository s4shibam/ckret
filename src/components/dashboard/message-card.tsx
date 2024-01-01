import { formatDistanceToNow } from 'date-fns'
import { BookLock, Expand, Delete } from 'lucide-react'

import MessageFullScreenView from './message-fullscreen-view'

type Props = {
  message: {
    _id: string
    content: string
    createdAt: string
  }
}
const MessageCard = ({ message }: Props) => {
  return (
    <div
      key={message._id}
      className="group relative flex flex-col justify-between gap-4 rounded-lg bg-gray-200 p-4"
    >
      <div className="grid grid-cols-[60px_1fr] items-center gap-4">
        <div className="grid aspect-square w-full place-items-center rounded-md bg-gradient-to-br from-ckret-primary to-ckret-secondary">
          <BookLock className="h-10 w-10 text-white" />
        </div>
        <p className="line-clamp-2 w-full pr-5">{message.content}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="mt-auto rounded-md bg-gray-300 px-2 py-1 capitalize">
          {formatDistanceToNow(message.createdAt, { addSuffix: true })}
        </p>
        <MessageFullScreenView messageContent={message.content}>
          <div title="Full Screen">
            <Expand className="absolute right-4 top-4 h-5 w-5 cursor-pointer" />
          </div>
        </MessageFullScreenView>
        <div title="Delete">
          <Delete
            className="cursor-pointer text-red-500 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  )
}

export default MessageCard
