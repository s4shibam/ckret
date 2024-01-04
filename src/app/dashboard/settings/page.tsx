'use client'

import { Loader, Pencil, Undo2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

import { cn } from '@lib/utils'

import EditFeedbackMessage from '@components/dashboard/edit-feedback-message'
import { Button } from '@components/ui/button'

import { useToggleInboxStatus } from '@api-hooks/user'

const Settings = () => {
  const { data } = useSession()
  const {
    mutate: toggleInboxStatusMutate,
    isLoading: isToggleInboxStatusLoading
  } = useToggleInboxStatus({
    onError: (error: any) => toast.error(error.message),

    onSuccess: (success: any) => {
      toast.success(success.message)
    }
  })

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
        <div className="flex flex-col gap-5 rounded-lg border-2 p-4">
          <div className="flex w-full flex-wrap items-center justify-between gap-4">
            <p className="whitespace-nowrap font-medium">Inbox Status</p>
            <div className="flex items-center gap-2">
              <p
                className={cn(
                  'cursor-default truncate rounded-md px-4 py-1 text-xl font-semibold tracking-wider xl:text-2xl',
                  {
                    'bg-green-300': data?.user?.is_inbox_enabled,
                    'bg-red-300': !data?.user?.is_inbox_enabled
                  }
                )}
              >
                {data?.user?.is_inbox_enabled ? 'Enabled' : 'Disabled'}
              </p>
              <Button
                disabled={isToggleInboxStatusLoading}
                size="icon"
                variant="outline"
                onClick={() => toggleInboxStatusMutate()}
              >
                {isToggleInboxStatusLoading ? (
                  <Loader className="h-5 w-5 animate-spin" />
                ) : (
                  <Undo2 className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
          <p className="rounded-md bg-white px-3 py-2 drop-shadow-md">
            Toggle the visibility of the inbox. When enabled, users can send
            messages to your inbox. When disabled, your link will not work.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Settings
