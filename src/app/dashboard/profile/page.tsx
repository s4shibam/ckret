'use client'

import { Feather, LogOut, MessageCircleReply, PenSquare } from 'lucide-react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

import EditAvatar from '@/components/dashboard/edit-avatar'
import EditName from '@/components/dashboard/edit-name'
import EditUsername from '@/components/dashboard/edit-username'
import Header from '@/components/dashboard/header'
import { Button } from '@/components/ui/button'
import { env } from '@/lib/env'

const Profile = () => {
  const { data } = useSession()

  return (
    <div className="min-h-full w-full bg-zinc-50/50">
      <Header title="Profile" />

      <div className="mx-auto w-full max-w-4xl space-y-6">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-2xl font-semibold text-zinc-900">
            Personal Information
          </h2>

          <div className="space-y-6">
            <div className="group relative space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Feather className="h-4 w-4 text-ckret-primary" />
                  <span className="text-base font-medium text-zinc-600">
                    Name
                  </span>
                </div>
                <EditName>
                  <Button className="h-8 w-8 p-0" size="sm" variant="ghost">
                    <PenSquare className="size-5 text-zinc-500 transition-colors group-hover:text-ckret-primary" />
                  </Button>
                </EditName>
              </div>
              <p className="text-xl font-medium text-zinc-900">
                {data?.user?.name || '-'}
              </p>
              <p className="text-base text-zinc-500">
                This is your public name, visible to all who have your ckret
                link
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Feather className="h-4 w-4 text-ckret-primary" />
                <span className="text-base font-medium text-zinc-600">
                  Email Address
                </span>
              </div>
              <p className="text-xl font-medium text-zinc-900">
                {data?.user?.email?.endsWith('@anonymous.user')
                  ? 'Email not available'
                  : data?.user?.email || '-'}
              </p>
              <p className="text-base text-zinc-500">
                This is your registered email address for this account
              </p>
            </div>

            <div className="group relative space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Feather className="h-4 w-4 text-ckret-primary" />
                  <span className="text-base font-medium text-zinc-600">
                    Username
                  </span>
                </div>
                <EditUsername>
                  <Button className="h-8 w-8 p-0" size="sm" variant="ghost">
                    <PenSquare className="size-5 text-zinc-500 transition-colors group-hover:text-ckret-primary" />
                  </Button>
                </EditUsername>
              </div>
              <p className="text-xl font-medium text-zinc-900">
                {data?.user?.username || '-'}
              </p>
              <p className="text-base text-zinc-500">
                Your username is used for your ckret link
              </p>
            </div>

            <div className="group relative space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Feather className="h-4 w-4 text-ckret-primary" />
                  <span className="text-base font-medium text-zinc-600">
                    Avatar
                  </span>
                </div>
                <EditAvatar>
                  <Button className="h-8 w-8 p-0" size="sm" variant="ghost">
                    <PenSquare className="size-5 text-zinc-500 transition-colors group-hover:text-ckret-primary" />
                  </Button>
                </EditAvatar>
              </div>
              <p className="grid size-10 place-items-center rounded-lg bg-zinc-200 text-xl font-medium">
                <span className="text-3xl">{data?.user?.avatar || '🕶️'}</span>
              </p>
              <p className="text-base text-zinc-500">
                This is your avatar, visible to all who have your ckret link
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Feather className="h-4 w-4 text-ckret-primary" />
            <h2 className="text-xl font-semibold text-zinc-900">Feedback</h2>
          </div>

          <div className="space-y-4">
            <Button
              asChild
              className="inline-flex items-center gap-2 rounded-lg bg-ckret-secondary px-4 py-2 text-sm font-medium text-white hover:bg-ckret-secondary/80"
            >
              <Link href={env.feedback_form_url || '#'} target="_blank">
                <MessageCircleReply className="size-5" />
                Share Your Feedback
              </Link>
            </Button>
            <p className="text-sm text-zinc-500">
              Help us improve by sharing your thoughts and suggestions
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <Button
            className="gap-2"
            size="lg"
            variant="destructive"
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            <LogOut className="size-5" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Profile
