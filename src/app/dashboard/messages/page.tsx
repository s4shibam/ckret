'use client'

import { AlertTriangle, RefreshCw, Trash2 } from 'lucide-react'

import { INBOX_STORAGE_LIMIT } from '@lib/constants'

import AllMessageDeleteModal from '@components/dashboard/all-message-delete-modal'
import MessageCard from '@components/dashboard/message-card'
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert'
import { Button } from '@components/ui/button'

const messages = [
  {
    _id: '1',
    content: 'This is a sample message.',
    createdAt: new Date('2023-12-28T12:34:56').toISOString()
  },
  {
    _id: '2',
    content:
      'This sample message is relatively larger and has a higher character count.',
    createdAt: new Date('2023-11-01T12:34:56').toISOString()
  },
  {
    _id: '3',
    content:
      'This is the longest sample message that is created by using several sample words to raise the total character count.',
    createdAt: new Date('2023-09-01T12:34:56').toISOString()
  }
]

const Messages = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex w-full justify-end gap-5">
        <Button className="text-lg">
          <RefreshCw />
          <p className="ml-2 hidden md:block">Refresh</p>
        </Button>
        <AllMessageDeleteModal>
          <Button className="text-lg" variant="destructive">
            <Trash2 />
            <p className="ml-2 hidden md:block">Delete All</p>
          </Button>
        </AllMessageDeleteModal>
      </div>

      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle className="flex justify-between">
          <p>Inbox Full</p>
          <p className="text-right">
            {INBOX_STORAGE_LIMIT} / {INBOX_STORAGE_LIMIT}
          </p>
        </AlertTitle>
        <AlertDescription>
          Your inbox is full. Please delete some messages to make space.
        </AlertDescription>
      </Alert>

      <div className="grid h-full w-full grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3">
        {messages.map((message) => (
          <MessageCard key={message._id} message={message} />
        ))}
      </div>
    </div>
  )
}

export default Messages
