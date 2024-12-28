'use client'

import { CircleCheck, Dice5, Loader, Send } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

import AnimatedLoader from '@/components/common/animated-loader'
import Branding from '@/components/common/branding'
import CreateLink from '@/components/common/create-link'
import ProfileNotFound from '@/components/common/profile-not-found'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useSubmitMessage } from '@/hooks/api/message'
import { useGetUserDetailsByUsername } from '@/hooks/api/user'
import { getRandomMessage } from '@/lib/sample-messages'
import { cn } from '@/lib/utils'

const SendMessage = ({ params }: { params: { username: string } }) => {
  const router = useRouter()
  const pathname = usePathname()
  const messageStatus = useSearchParams().get('status')
  const [message, setMessage] = useState('')

  const {
    data: recipient,
    isLoading: isRecipientLoading,
    error: recipientError
  } = useGetUserDetailsByUsername({
    username: params.username
  })

  const { mutate: submitMessageMutation, isPending: isSubmitMessageLoading } =
    useSubmitMessage({
      onError: (error) => toast.error(error.message),
      onSuccess: (success) => {
        setMessage('')
        toast.success(success.message)
        router.push(pathname + '?status=sent')
      }
    })

  const setRandomMessage = () => {
    const randomMessage = getRandomMessage()
    setMessage(randomMessage)
  }

  const handleSubmit = () => {
    submitMessageMutation({
      messageContent: message.trim(),
      recipientUsername: params.username
    })
  }

  if (isRecipientLoading) {
    return <AnimatedLoader type="fullscreen" />
  }

  if (recipientError?.error) {
    return <ProfileNotFound />
  }

  if (messageStatus === 'sent') {
    return (
      <BackgroundLayout>
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-3 text-white">
            <CircleCheck className="size-9" />
            <span className="text-xl font-medium">Message delivered!</span>
          </div>

          <div className="w-full rounded-lg bg-white p-3 text-center">
            <p className="text-xl font-medium">
              {recipient?.data?.feedback_message}
            </p>
            <div className="mt-6 text-sm text-zinc-700">
              — {recipient?.data?.name} —
            </div>
          </div>

          <Button
            className="mt-6 h-14 w-full text-lg font-medium transition-all hover:scale-[1.02]"
            variant="secondary"
            onClick={() => router.back()}
          >
            Send Another Message
          </Button>
        </div>
      </BackgroundLayout>
    )
  }

  return (
    <BackgroundLayout>
      <div className="flex flex-col items-center rounded-lg bg-white/75 p-2 text-white backdrop-blur-md">
        <p className="bg-gradient-to-r from-zinc-700 to-zinc-900 bg-clip-text text-center text-xl font-medium capitalize tracking-wide text-transparent">
          Secret Message for {recipient?.data?.name}
        </p>
      </div>

      <div
        className={cn(
          'group relative overflow-hidden rounded-lg bg-white p-4 backdrop-blur-md',
          {
            'cursor-not-allowed bg-white/20':
              recipient?.data?.is_message_inbox_full
          }
        )}
      >
        {recipient?.data?.is_message_inbox_full && (
          <div className="text-center text-base sm:p-2 sm:text-xl">
            {recipient?.message}
          </div>
        )}

        {!recipient?.data?.is_message_inbox_full && (
          <>
            <textarea
              className="h-[180px] w-full resize-none bg-transparent text-xl placeholder:text-zinc-400 focus:outline-none"
              id="message"
              maxLength={recipient?.data?.message_max_length}
              name="message"
              placeholder="Write something for me..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              className="absolute bottom-3 right-3 rounded-full bg-black backdrop-blur-sm hover:bg-black/90"
              size="icon"
              title="Get Random Message"
              variant="ghost"
              onClick={setRandomMessage}
            >
              <Dice5 className="h-6 w-6 animate-spin-slow text-white group-hover:animate-pause" />
            </Button>
          </>
        )}
      </div>

      {!recipient?.data?.is_message_inbox_full && (
        <p className="-translate-y-2 text-right text-sm text-white/80">
          <span className="font-medium">{message.length}</span>
          {' / '}
          <span className="text-white/60">
            {recipient?.data?.message_max_length || '-'}
          </span>
        </p>
      )}

      <Button
        className="mt-6 h-14 w-full rounded-lg text-lg font-medium transition-all hover:scale-[1.02] disabled:opacity-50"
        disabled={
          recipient?.data?.is_message_inbox_full ||
          isSubmitMessageLoading ||
          message.length === 0
        }
        size="lg"
        variant="secondary"
        onClick={handleSubmit}
      >
        {isSubmitMessageLoading ? (
          <Loader className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <Send className="mr-2 h-5 w-5" />
        )}
        Send Message
      </Button>
    </BackgroundLayout>
  )
}

export default SendMessage

const BackgroundLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-ckret-gradient flex min-h-screen w-full flex-col items-center gap-6 p-5">
      <div className="z-10 backdrop-blur-sm">
        <Branding />
      </div>
      <Card className="z-10 w-full max-w-[32rem] space-y-6 rounded-2xl border-none bg-gradient-to-br from-ckret-primary to-ckret-secondary p-6 shadow-xl">
        {children}
      </Card>

      <div className="z-10 w-full max-w-[32rem] rounded-2xl bg-gradient-to-br from-zinc-600 to-zinc-800 p-5">
        <CreateLink />
      </div>

      <Link
        className="mt-auto text-zinc-500 underline-offset-4 backdrop-blur-sm hover:underline"
        href="/legal/disclaimer"
        target="_blank"
      >
        Disclaimer
      </Link>
    </div>
  )
}
