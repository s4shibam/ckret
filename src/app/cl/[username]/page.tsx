'use client'

import { formatDistanceToNow } from 'date-fns'
import { Brush, Frown, Inbox, MessageCircle, Reply } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { IMessage, ISketch } from '@_types/types'

import { cn } from '@lib/utils'

import AnimatedLoader from '@components/common/animated-loader'
import Branding from '@components/common/branding'
import CreateLink from '@components/common/create-link'
import { Avatar, AvatarFallback } from '@components/ui/avatar'
import { Button } from '@components/ui/button'

import { useGetUserPublicProfile } from '@api-hooks/user'

const PublicProfile = ({ params }: { params: { username: string } }) => {
  const pathname = usePathname()

  const {
    data: profile,
    isLoading,
    error
  } = useGetUserPublicProfile({
    username: params.username
  })

  if (isLoading) {
    return <AnimatedLoader type="fullscreen" />
  }

  if (error || !profile?.data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
        <div className="w-full max-w-lg space-y-4 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
            <Frown className="h-10 w-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">
            User not found
          </h1>
          <p className="text-gray-600">Check the username and try again</p>
        </div>
      </div>
    )
  }

  const { name, username, avatar, messages = [], sketches = [] } = profile.data

  const isOddMessages = messages.length % 2 !== 0
  const regularMessages = isOddMessages ? messages.slice(0, -1) : messages
  const lastMessage = isOddMessages ? messages[messages.length - 1] : null

  const isOddSketches = sketches.length % 2 !== 0
  const regularSketches = isOddSketches ? sketches.slice(0, -1) : sketches
  const lastSketch = isOddSketches ? sketches[sketches.length - 1] : null

  const noPublicContent = messages.length === 0 && sketches.length === 0

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-ckret-secondary/20 via-ckret-primary/10 to-transparent">
      <div className="mx-auto flex max-w-2xl flex-col gap-10 px-4">
        <div className="flex justify-center py-6">
          <Branding />
        </div>

        <div className="flex flex-col items-center text-center">
          <Avatar className="mb-6 grid h-24 w-24 place-items-center border-4 border-white bg-white bg-gradient-to-br from-ckret-primary/50 to-ckret-secondary/10 shadow-xl">
            <AvatarFallback className="size-16 bg-transparent text-6xl">
              {avatar || '🕶️'}
            </AvatarFallback>
          </Avatar>

          <h1 className="mb-1 text-3xl/5 font-bold text-gray-900">{name}</h1>

          <p className="mb-4 text-gray-500">@{username}</p>

          <p className="mb-6 text-gray-700">
            Interact anonymously with me through messages or sketches
          </p>

          <div className="mb-16 flex gap-3">
            <Button
              asChild
              className="min-w-[140px] bg-ckret-primary text-base hover:bg-ckret-primary/90"
              size="lg"
            >
              <Link href={`${pathname}/message`}>
                <MessageCircle className="mr-2 h-5 w-5" />
                Message
              </Link>
            </Button>
            <Button
              asChild
              className="min-w-[140px] bg-ckret-secondary text-base hover:bg-ckret-secondary/90"
              size="lg"
            >
              <Link href={`${pathname}/sketch`}>
                <Brush className="mr-2 h-5 w-5" />
                Sketch
              </Link>
            </Button>
          </div>
        </div>

        {messages.length > 0 && (
          <section>
            <div className="mb-8 flex items-center justify-center gap-4">
              <div className="h-px flex-1 bg-zinc-400" />
              <h2 className="text-center text-sm font-medium uppercase tracking-wider text-zinc-600">
                Featured Messages
              </h2>
              <div className="h-px flex-1 bg-zinc-400" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {regularMessages.map((message: IMessage) => (
                <CardWithReply
                  key={message._id}
                  reply={message.reply}
                  updatedAt={message.updatedAt}
                >
                  <p className="whitespace-pre-wrap leading-relaxed text-gray-800">
                    {message.content}
                  </p>
                </CardWithReply>
              ))}
            </div>

            {lastMessage && (
              <div
                className={cn(
                  'flex justify-center',
                  messages.length > 1 && 'mt-4'
                )}
              >
                <div className="w-full sm:w-1/2">
                  <CardWithReply
                    key={lastMessage._id}
                    reply={lastMessage.reply}
                    updatedAt={lastMessage.updatedAt}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed text-gray-800">
                      {lastMessage.content}
                    </p>
                  </CardWithReply>
                </div>
              </div>
            )}
          </section>
        )}

        {sketches.length > 0 && (
          <section>
            <div className="mb-8 flex items-center justify-center gap-4">
              <div className="h-px flex-1 bg-zinc-400" />
              <h2 className="text-center text-sm font-medium uppercase tracking-wider text-zinc-600">
                Featured Sketches
              </h2>
              <div className="h-px flex-1 bg-zinc-400" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {regularSketches.map((sketch: ISketch) => (
                <CardWithReply
                  key={sketch._id}
                  isSketch
                  reply={sketch.reply}
                  updatedAt={sketch.createdAt}
                >
                  <Image
                    alt="Sketch"
                    className="size-full rounded-xl border object-cover"
                    height={200}
                    src={sketch.sketch_url}
                    width={200}
                  />
                </CardWithReply>
              ))}
            </div>

            {lastSketch && (
              <div
                className={cn(
                  'flex justify-center',
                  sketches.length > 1 && 'mt-4'
                )}
              >
                <div className="w-full sm:w-1/2">
                  <CardWithReply
                    key={lastSketch._id}
                    isSketch
                    reply={lastSketch.reply}
                    updatedAt={lastSketch.createdAt}
                  >
                    <Image
                      alt="Sketch"
                      className="size-full rounded-xl border object-cover"
                      height={200}
                      src={lastSketch.sketch_url}
                      width={200}
                    />
                  </CardWithReply>
                </div>
              </div>
            )}
          </section>
        )}

        {noPublicContent && (
          <div className="flex items-center justify-center py-20">
            <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-gray-100 p-3">
                  <Inbox className="h-6 w-6 text-gray-400" />
                </div>
              </div>
              <h3 className="mb-2 font-medium text-gray-900">No Content Yet</h3>
              <p className="text-sm text-zinc-600">
                This user has not shared any public messages or sketches
              </p>
            </div>
          </div>
        )}

        <div className="mt-20 rounded-2xl bg-gradient-to-br from-zinc-600 to-zinc-800 p-5">
          <div className="mx-auto w-full max-w-md">
            <CreateLink />
          </div>
        </div>

        <Link
          className="mx-auto mb-10 mt-6 text-center text-sm text-zinc-600 transition-colors hover:text-gray-600 hover:underline"
          href="/legal/disclaimer"
          target="_blank"
        >
          Disclaimer
        </Link>
      </div>
    </div>
  )
}

export default PublicProfile

const CardWithReply = ({
  children,
  updatedAt,
  reply,
  isSketch = false
}: {
  children: React.ReactNode
  updatedAt: string
  reply?: string
  isSketch?: boolean
}) => {
  return (
    <div className="flex h-full flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="size-8 rounded-full bg-zinc-100 p-1.5">
          {isSketch ? (
            <Brush className="size-full text-zinc-500" />
          ) : (
            <MessageCircle className="size-full text-zinc-500" />
          )}
        </div>

        <p className="line-clamp-1 flex-1 text-sm capitalize text-zinc-500">
          Added{' '}
          {formatDistanceToNow(new Date(updatedAt), {
            addSuffix: true
          })}
        </p>
      </div>

      {children}

      <p className="rounded-xl bg-gray-100 p-3 text-sm leading-relaxed text-gray-700">
        <Reply className="-mt-1.5 mr-1.5 inline-block size-5 text-gray-500" />
        {reply || 'No reply yet'}
      </p>
    </div>
  )
}
