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

import { IMessage } from '@_types/types'

import AnimatedLoader from '@components/common/animated-loader'
import AllMessageDeleteModal from '@components/dashboard/all-message-delete-modal'
import MessageCard from '@components/dashboard/message-card'
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert'
import { Button } from '@components/ui/button'

import { useGetAllMessages } from '@api-hooks/message'

const Messages = () => {
  const { data } = useSession()
  const [inboxStorageStatus, setInboxStorageStatus] = useState<
    'full' | 'almost_full' | 'ok'
  >('ok')

  const {
    data: messages,
    isLoading: isMessagesLoading,
    refetch: messagesRefetch,
    isRefetching: isMessagesRefetching
  } = useGetAllMessages()

  useEffect(() => {
    const diff = (data?.user?.inbox_max_size ?? 0) - messages?.data?.length

    if (diff === 0) {
      setInboxStorageStatus('full')
    } else if (diff <= 5) {
      setInboxStorageStatus('almost_full')
    } else {
      setInboxStorageStatus('ok')
    }
  }, [data?.user?.inbox_max_size, messages?.data?.length])

  return (
    <div className="flex flex-col gap-5 ">
      <div className="flex w-full justify-end gap-5">
        <Button
          className="text-lg"
          disabled={isMessagesLoading || isMessagesRefetching}
          onClick={() => messagesRefetch()}
        >
          {isMessagesRefetching ? (
            <LRLoader className="animate-spin" />
          ) : (
            <RefreshCw />
          )}
          <p className="ml-2 hidden md:block">Refresh</p>
        </Button>
        <AllMessageDeleteModal>
          <Button className="text-lg" variant="destructive">
            <Trash2 />
            <p className="ml-2 hidden md:block">Delete All</p>
          </Button>
        </AllMessageDeleteModal>
      </div>

      {inboxStorageStatus !== 'ok' && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle className="flex justify-between">
            <p>
              {inboxStorageStatus === 'almost_full' && 'Inbox Almost Full'}
              {inboxStorageStatus === 'full' && 'Inbox Full'}
            </p>
            <p className="text-right">
              {messages?.data?.length} / {data?.user?.inbox_max_size}
            </p>
          </AlertTitle>
          <AlertDescription>
            {inboxStorageStatus === 'almost_full' &&
              'Your inbox is almost full. Please delete some messages to save space.'}
            {inboxStorageStatus === 'full' &&
              'Your inbox is full. Please delete some messages to make space.'}
          </AlertDescription>
        </Alert>
      )}

      {isMessagesLoading && <AnimatedLoader />}
      {messages?.data?.length === 0 && (
        <div className="grid w-full place-items-center pt-[15%] text-gray-300">
          <Eraser className="h-20 w-20" />
          <p className="text-xl font-medium tracking-wide">Inbox is empty!</p>
        </div>
      )}
      <div className="grid h-full w-full grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3">
        {messages?.data?.map((message: IMessage) => (
          <MessageCard key={message._id} message={message} />
        ))}
      </div>
    </div>
  )
}

export default Messages
