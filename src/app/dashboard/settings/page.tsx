'use client'

import { PenSquare, Settings as SettingsIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'

import EditFeedbackMessage from '@components/dashboard/edit-feedback-message'
import Header from '@components/dashboard/header'
import InboxStatus from '@components/dashboard/inbox-status'
import { Button } from '@components/ui/button'

const Settings = () => {
  const { data } = useSession()

  return (
    <div className="min-h-full w-full bg-slate-50/50 pb-8">
      <Header title="Settings" />

      <div className="m-6 mx-auto w-full max-w-4xl rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-semibold text-gray-900">
          Message Settings
        </h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <SettingsIcon className="size-5 text-ckret-primary" />
              <span className="text-base font-medium text-gray-600">
                Message Character Limit
              </span>
            </div>
            <p className="text-xl font-medium text-gray-900">
              {data?.user?.message_max_length || 150} Characters
            </p>
            <p className="text-base text-gray-500">
              Maximum character limit for each message that users will send you
            </p>
          </div>

          <div className="group relative space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SettingsIcon className="size-5 text-ckret-primary" />
                <span className="text-base font-medium text-gray-600">
                  Feedback Message
                </span>
              </div>
              <EditFeedbackMessage>
                <Button className="h-8 w-8 p-0" size="sm" variant="ghost">
                  <PenSquare className="size-5 text-gray-500 transition-colors group-hover:text-ckret-primary" />
                </Button>
              </EditFeedbackMessage>
            </div>
            <p className="text-xl font-medium text-gray-900">
              {data?.user?.feedback_message || 'Thank You'}
            </p>
            <p className="text-base text-gray-500">
              This message will be shown to users after sending an anonymous
              message
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <SettingsIcon className="size-5 text-ckret-primary" />
              <span className="text-base font-medium text-gray-600">
                Inbox Storage Limit
              </span>
            </div>
            <p className="text-xl font-medium text-gray-900">
              {data?.user?.inbox_max_size || 50} Messages
            </p>
            <p className="text-base text-gray-500">
              Maximum storage capacity for messages in your inbox
            </p>
          </div>

          <div className="border-t pt-6">
            <InboxStatus />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
