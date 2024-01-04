'use client'

import { Loader, Undo2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

import { cn } from '@lib/utils'

import { Button } from '@components/ui/button'

import { useToggleInboxStatus } from '@api-hooks/user'

const InboxStatus = () => {
  const { data, update } = useSession()
  const {
    mutate: toggleInboxStatusMutate,
    isLoading: isToggleInboxStatusLoading
  } = useToggleInboxStatus({
    onError: (error: any) => toast.error(error.message),

    onSuccess: (success: any) => {
      update({ is_inbox_enabled: success?.data?.is_inbox_enabled })
      toast.success(success.message)
    }
  })

  return (
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
  )
}

export default InboxStatus
