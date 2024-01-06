'use client'

import { Loader, Settings } from 'lucide-react'
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
    <div className="left-border-card">
      <div className="flex items-center gap-3">
        <p className="left-border-card-heading">
          <Settings className="h-5 w-5" />
          Inbox Status
        </p>

        {isToggleInboxStatusLoading ? (
          <div className="grid h-6 w-11 rounded-full bg-secondary">
            <Loader className="animate-spin-slow" />
          </div>
        ) : (
          <Switch
            checked={data?.user?.is_inbox_enabled}
            onClick={() => toggleInboxStatusMutate()}
          />
        )}
      </div>
      <span
        className={cn('left-border-card-value', {
          '!bg-green-800': data?.user?.is_inbox_enabled,
          '!bg-red-800': !data?.user?.is_inbox_enabled
        })}
      >
        {data?.user?.is_inbox_enabled ? 'Enabled' : 'Disabled'}
      </span>

      <ul>
        <li>
          Enabled status allows users to send you messages, while disabled
          prevents that.
        </li>
        <li className="text-blue-700">
          Toggle the switch to change status of the inbox.
        </li>
      </ul>
    </div>
  )
}

export default InboxStatus
