'use client'

import { PenSquare, Settings as SettingsIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'

import EditFeedbackMessage from '@components/dashboard/edit-feedback-message'
import InboxStatus from '@components/dashboard/inbox-status'

const Settings = () => {
  const { data } = useSession()

  return (
    <div className="h-full w-full">
      <div className="flex w-full max-w-[800px] flex-col gap-10 xl:text-lg">
        <div className="left-border-card">
          <div className="left-border-card-heading">
            <SettingsIcon className="h-5 w-5" />
            Message Character Limit
          </div>
          <p className="left-border-card-value">
            {data?.user?.message_max_length || 150} Characters
          </p>
          <ul>
            <li>
              This is the maximum character limit for each message that users
              will send you.
            </li>
            <li className="text-blue-700">
              Limit modification option will be added soon.
            </li>
          </ul>
        </div>
        <div className="left-border-card">
          <div className="left-border-card-heading">
            <SettingsIcon className="h-5 w-5" />
            Feedback Message
            <EditFeedbackMessage>
              <PenSquare className="h-5 w-5 cursor-pointer" />
            </EditFeedbackMessage>
          </div>
          <p className="left-border-card-value">
            {data?.user?.feedback_message || 'Thank You'}
          </p>
          <ul>
            <li>
              This message will be shown to users after sending an anonymous
              message to you.
            </li>
            <li className="text-blue-700">
              Edit the message as per your choice.
            </li>
          </ul>
        </div>
        <div className="left-border-card">
          <div className="left-border-card-heading">
            <SettingsIcon className="h-5 w-5" />
            Inbox Storage Limit
          </div>
          <p className="left-border-card-value">
            {data?.user?.inbox_max_size || 50} Messages
          </p>
          <ul>
            <li>
              This is the maximum storage capacity for messages of your inbox.
            </li>
            <li className="text-blue-700">
              Limit modification option will be added soon.
            </li>
          </ul>
        </div>

        <InboxStatus />
      </div>
    </div>
  )
}

export default Settings
