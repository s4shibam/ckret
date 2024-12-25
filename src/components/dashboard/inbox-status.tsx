'use client'

import { Loader, Settings } from 'lucide-react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Switch } from '@/components/ui/switch'
import { useToggleInboxStatus } from '@/hooks/api/user'
import { cn } from '@/lib/utils'

const InboxStatus = () => {
  const { data, update } = useSession()
  const {
    mutate: toggleInboxStatusMutate,
    isPending: isToggleInboxStatusLoading
  } = useToggleInboxStatus({
    onError: (error) => toast.error(error.message),
    onSuccess: (success) => {
      update({ is_inbox_enabled: success?.data?.is_inbox_enabled })
      toast.success(success.message)
    }
  })

  return (
    <div>
      <div className="-mt-1 mb-4 flex items-center justify-between">
        <div className="flex w-full items-center gap-2">
          <Settings className="size-5 text-ckret-primary" />
          <span className="text-base font-medium text-zinc-600">
            Inbox Status
          </span>
          {isToggleInboxStatusLoading ? (
            <div className="ml-auto grid h-7 w-11 place-items-center rounded-full bg-zinc-100">
              <Loader className="h-4 w-4 animate-spin text-ckret-primary" />
            </div>
          ) : (
            <Switch
              checked={data?.user?.is_inbox_enabled}
              className="ml-auto"
              onClick={() => toggleInboxStatusMutate()}
            />
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex size-12 shrink-0 items-center justify-center rounded-full',
              data?.user?.is_inbox_enabled
                ? 'bg-green-100 text-green-600'
                : 'bg-red-100 text-red-600'
            )}
          >
            <span className="text-base font-medium">
              {data?.user?.is_inbox_enabled ? 'ON' : 'OFF'}
            </span>
          </div>
          <div>
            <p className="text-lg/6 font-medium text-zinc-900">
              {data?.user?.is_inbox_enabled ? 'Active' : 'Inactive'}
            </p>
            <p className="text-base/4 text-zinc-500">
              {data?.user?.is_inbox_enabled
                ? 'Your inbox is open to receive messages and sketches'
                : 'Your inbox is closed to new messages and sketches'}
            </p>
          </div>
        </div>

        {!data?.user?.is_inbox_enabled && (
          <Alert className="mt-2" variant="destructive">
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              Your public profile will not be accessible when the inbox is
              disabled.
            </AlertDescription>
          </Alert>
        )}

        <div className="rounded-lg bg-ckret-primary/10 p-4">
          <p className="text-base text-ckret-primary">
            Toggle the switch above to{' '}
            {data?.user?.is_inbox_enabled ? 'stop' : 'allow'} receiving new
            messages and sketches
          </p>
        </div>
      </div>
    </div>
  )
}

export default InboxStatus
