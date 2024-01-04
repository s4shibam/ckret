'use client'

import { Loader } from 'lucide-react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

import { cn } from '@lib/utils'

import { Switch } from '@components/ui/switch'

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
              'cursor-default truncate rounded-md border px-4 py-1 text-xl font-semibold tracking-wider xl:text-2xl',
              {
                'border-green-500 bg-green-300': data?.user?.is_inbox_enabled,
                'border-red-500 bg-red-300': !data?.user?.is_inbox_enabled
              }
            )}
          >
            {data?.user?.is_inbox_enabled ? 'Enabled' : 'Disabled'}
          </p>

          <div className="grid w-11">
            {isToggleInboxStatusLoading ? (
              <Loader className="m-auto h-8 w-8 animate-spin" />
            ) : (
              <Switch
                checked={data?.user?.is_inbox_enabled}
                onClick={() => toggleInboxStatusMutate()}
              />
            )}
          </div>
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
