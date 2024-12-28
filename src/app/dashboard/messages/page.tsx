'use client'

import {
  AlertTriangle,
  Eraser,
  Loader as LRLoader,
  RefreshCw,
  Trash2
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import AnimatedLoader from '@/components/common/animated-loader'
import AllMessageDeleteModal from '@/components/dashboard/all-message-delete-modal'
import Header from '@/components/dashboard/header'
import MessageCard from '@/components/dashboard/message-card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useGetAllMessages } from '@/hooks/api/message'
import { TMessage, TStorageStatus } from '@/types/index'

const Messages = () => {
  const { data } = useSession()
  const [storageStatus, setStorageStatus] = useState<TStorageStatus>('empty')

  const {
    data: messages,
    isLoading: isMessagesLoading,
    refetch: messagesRefetch,
    isRefetching: isMessagesRefetching
  } = useGetAllMessages()

  useEffect(() => {
    const messageLimit = data?.user?.inbox_max_size ?? 0
    const messageCount = messages?.data?.length ?? 0
    const diff = messageLimit - messageCount

    if (messageCount === 0) {
      setStorageStatus('empty')
    } else if (diff === 0) {
      setStorageStatus('full')
    } else if (diff <= 5) {
      setStorageStatus('almost_full')
    } else {
      setStorageStatus('ok')
    }
  }, [data?.user?.inbox_max_size, messages?.data?.length])

  return (
    <div className="flex flex-col gap-5">
      <Header
        title={`Messages (${messages?.data?.length ?? 0}/${
          data?.user?.inbox_max_size ?? 0
        })`}
      >
        <div className="flex gap-2">
          <Button
            disabled={isMessagesLoading || isMessagesRefetching}
            onClick={() => messagesRefetch()}
          >
            {isMessagesRefetching ? (
              <LRLoader className="size-5 animate-spin" />
            ) : (
              <RefreshCw className="size-5" />
            )}
            <p className="ml-2 hidden md:block">Refresh</p>
          </Button>
          <AllMessageDeleteModal>
            <Button variant="destructive">
              <Trash2 className="size-5" />
              <p className="ml-2 hidden md:block">Delete All</p>
            </Button>
          </AllMessageDeleteModal>
        </div>
      </Header>

      {(storageStatus === 'almost_full' || storageStatus === 'full') && (
        <Alert
          variant={storageStatus === 'almost_full' ? 'warning' : 'destructive'}
        >
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle className="flex justify-between">
            <p>
              {storageStatus === 'almost_full' && 'Inbox Almost Full'}
              {storageStatus === 'full' && 'Inbox Full'}
            </p>
            <p className="text-right">
              {messages?.data?.length} / {data?.user?.inbox_max_size}
            </p>
          </AlertTitle>
          <AlertDescription>
            {storageStatus === 'almost_full' &&
              'Your inbox is almost full. Please delete some messages to save space.'}
            {storageStatus === 'full' &&
              'Your inbox is full. Please delete some messages to make space.'}
          </AlertDescription>
        </Alert>
      )}

      {isMessagesLoading && <AnimatedLoader />}

      {messages?.data?.length === 0 && (
        <div className="mx-auto mt-[15%] grid w-fit place-items-center text-zinc-400">
          <Eraser className="h-20 w-20 animate-shake" />
          <p className="text-xl font-medium tracking-wide">Inbox is empty!</p>
        </div>
      )}

      <div className="grid h-full w-full gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {messages?.data?.map((message: TMessage) => (
          <MessageCard key={message._id} message={message} />
        ))}
      </div>
    </div>
  )
}

export default Messages
