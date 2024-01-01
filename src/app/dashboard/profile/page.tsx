'use client'

import { LogOut, MessageSquareQuote, Pencil } from 'lucide-react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

import EditName from '@components/dashboard/edit-name'
import EditUsername from '@components/dashboard/edit-username'
import { Button } from '@components/ui/button'

const Profile = () => {
  const { data } = useSession()

  return (
    <div className="h-full w-full">
      <div className="flex w-full max-w-[800px] flex-col gap-4 text-lg xl:text-xl">
        <div className="flex flex-col gap-5 rounded-lg border-2 p-4">
          <div className="flex w-full flex-wrap items-center justify-between gap-4">
            <p className="whitespace-nowrap font-medium">Name</p>
            <div className="flex items-center gap-2">
              <p className="cursor-default truncate rounded-md bg-gray-200 px-4 py-1 text-xl font-semibold tracking-wider xl:text-2xl">
                {data?.user?.name || '-'}
              </p>
              <EditName>
                <Button size="icon" variant="outline">
                  <Pencil className="h-5 w-5" />
                </Button>
              </EditName>
            </div>
          </div>
          <p className="rounded-md bg-white px-3 py-2 drop-shadow-md">
            This is your public name, which appears when you share your ckret
            link with someone.
          </p>
        </div>
        <div className="flex flex-col gap-5 rounded-lg border-2 p-4">
          <div className="flex w-full flex-wrap items-center justify-between gap-4">
            <p className="whitespace-nowrap font-medium">Email Address</p>

            <p className="cursor-default truncate rounded-md bg-gray-200 px-4 py-1 text-xl font-semibold tracking-wider xl:text-2xl">
              {data?.user?.email || '-'}
            </p>
          </div>
          <p className="rounded-md bg-white px-3 py-2 drop-shadow-md">
            This is your registered email address for this account. This cannot
            be changed further.
          </p>
        </div>
        <div className="flex flex-col gap-5 rounded-lg border-2 p-4">
          <div className="flex w-full flex-wrap items-center justify-between gap-4">
            <p className="whitespace-nowrap font-medium">Username</p>
            <div className="flex items-center gap-2">
              <p className="cursor-default truncate rounded-md bg-gray-200 px-4 py-1 text-xl font-semibold tracking-wider xl:text-2xl">
                {data?.user?.name || '-'}
              </p>
              <EditUsername>
                <Button size="icon" variant="outline">
                  <Pencil className="h-5 w-5" />
                </Button>
              </EditUsername>
            </div>
          </div>
          <p className="rounded-md bg-white px-3 py-2 drop-shadow-md">
            Your username is used for your personalized ckret link. Changing
            username will directly affect your ckret link.
          </p>
        </div>

        <div className="my-10 grid gap-5 md:grid-cols-2">
          <Button
            className="gap-2 text-lg"
            size="lg"
            variant="destructive"
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            <LogOut />
            Log Out
          </Button>
          <Button asChild className="gap-2 text-lg" size="lg">
            <Link href="#" target="_blank">
              <MessageSquareQuote />
              Share Feedback
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Profile
