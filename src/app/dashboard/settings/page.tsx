'use client'

import { Pencil } from 'lucide-react'
import { useSession } from 'next-auth/react'

import EditFeedbackMessage from '@components/dashboard/edit-feedback-message'
import InboxStatus from '@components/dashboard/inbox-status'
import { Button } from '@components/ui/button'

const Settings = () => {
  const { data } = useSession()

  return (
    <div className="h-full w-full">
      <div className="flex w-full max-w-[800px] flex-col gap-4 text-lg xl:text-xl">
        <div className="flex flex-col gap-5 rounded-lg border-2 p-4">
          <div className="flex w-full flex-wrap items-center justify-between gap-4">
            <p className="whitespace-nowrap font-medium">
              Message Character Limit
            </p>
            <p className="cursor-default truncate rounded-md bg-gray-200 px-4 py-1 text-xl font-semibold tracking-wider xl:text-2xl">
              {data?.user?.message_max_length}
            </p>
          </div>
          <p className="rounded-md bg-white px-3 py-2 drop-shadow-md">
            This is the maximum character limit for each message that users will
            send you.
            <span className="block text-gray-500">
              Soon we will provide an option to modify the limit.
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-5 rounded-lg border-2 p-4">
          <div className="flex w-full flex-wrap items-center justify-between gap-4">
            <p className="whitespace-nowrap font-medium">Feedback Message</p>
            <div className="flex items-center gap-2">
              <p className="cursor-default truncate rounded-md bg-gray-200 px-4 py-1 text-xl font-semibold tracking-wider xl:text-2xl">
                {data?.user?.feedback_message}
              </p>
              <EditFeedbackMessage>
                <Button size="icon" variant="outline">
                  <Pencil className="h-5 w-5" />
                </Button>
              </EditFeedbackMessage>
            </div>
          </div>
          <p className="rounded-md bg-white px-3 py-2 drop-shadow-md">
            Edit and customize the message that users receive after submitting
            an anonymous message for you.
          </p>
        </div>
        <div className="flex flex-col gap-5 rounded-lg border-2 p-4">
          <div className="flex w-full flex-wrap items-center justify-between gap-4">
            <p className="whitespace-nowrap font-medium">Inbox Storage Limit</p>
            <p className="cursor-default truncate rounded-md bg-gray-200 px-4 py-1 text-xl font-semibold tracking-wider xl:text-2xl">
              {data?.user?.inbox_max_size} Messages
            </p>
          </div>
          <p className="rounded-md bg-white px-3 py-2 drop-shadow-md">
            This is your inbox&apos;s maximum storage capacity. If your inbox is
            full, remove some old messages to make room for new ones.
            <span className="block text-gray-500">
              We will soon give the opportunity to change the limit.
            </span>
          </p>
        </div>
        <InboxStatus />
      </div>
    </div>
  )
}

export default Settings
