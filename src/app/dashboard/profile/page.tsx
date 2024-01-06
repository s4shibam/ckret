'use client'

import { LogOut, PenSquare, Feather, MessageCircleReply } from 'lucide-react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

import { FEEDBACK_FORM_URL } from '@lib/constants'

import EditName from '@components/dashboard/edit-name'
import EditUsername from '@components/dashboard/edit-username'
import { Button } from '@components/ui/button'

const Profile = () => {
  const { data } = useSession()

  return (
    <div className="h-full w-full">
      <div className="flex w-full max-w-[800px] flex-col gap-10 xl:text-lg">
        <div className="left-border-card">
          <div className="left-border-card-heading">
            <Feather className="h-5 w-5" />
            Name
            <EditName>
              <PenSquare className="h-5 w-5 cursor-pointer" />
            </EditName>
          </div>
          <p className="left-border-card-value">{data?.user?.name || '-'}</p>
          <ul>
            <li>
              This is your public name, visible to all who have your ckret link.
            </li>
            <li className="text-blue-700">
              Edit your name as per your choice.
            </li>
          </ul>
        </div>
        <div className="left-border-card">
          <div className="left-border-card-heading">
            <Feather className="h-5 w-5" />
            Email Address
          </div>
          <p className="left-border-card-value">{data?.user?.email || '-'}</p>
          <ul>
            <li>This is your registered email address for this account.</li>
            <li className="text-blue-700">Email cannot be changed further.</li>
          </ul>
        </div>
        <div className="left-border-card">
          <div className="left-border-card-heading">
            <Feather className="h-5 w-5" />
            Username
            <EditUsername>
              <PenSquare className="h-5 w-5 cursor-pointer" />
            </EditUsername>
          </div>
          <p className="left-border-card-value">
            {data?.user?.username || '-'}
          </p>
          <ul>
            <li>Your username is used for your ckret link.</li>
            <li className="text-blue-700">
              Edit the message as per your choice.
            </li>
          </ul>
        </div>
        <div className="left-border-card">
          <div className="left-border-card-heading">
            <Feather className="h-5 w-5" />
            Feedback
          </div>
          <Button
            asChild
            className="w-fit gap-2 text-xl font-semibold tracking-wider"
          >
            <Link href={FEEDBACK_FORM_URL || '#'} target="_blank">
              <MessageCircleReply />
              Share Feedback
            </Link>
          </Button>
          <ul>
            <li>Share your feedback with us on a google form.</li>
            <li className="text-blue-700">
              Click on the above button to share your feedback.
            </li>
          </ul>
        </div>

        <Button
          className="my-10 w-fit gap-2 px-20 text-lg"
          size="lg"
          variant="destructive"
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          <LogOut />
          Log Out
        </Button>
      </div>
    </div>
  )
}

export default Profile
