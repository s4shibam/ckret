'use client'

import { Watermark } from '@hirohe/react-watermark'
import { CircleCheck, Dice5, Frown, Loader, Send } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { getRandomMessage } from '@lib/sample-messages'
import { cn } from '@lib/utils'

import AnimatedLoader from '@components/common/animated-loader'
import Branding from '@components/common/branding'
import CreateLink from '@components/common/create-link'
import { Button } from '@components/ui/button'

import { useSubmitMessage } from '@api-hooks/message'
import { useGetUserDetailsByUsername } from '@api-hooks/user'
import { Card } from '@components/ui/card'
import Link from 'next/link'

const SendMessage = ({ params }: { params: { username: string } }) => {
  const router = useRouter()
  const pathname = usePathname()
  const messageStatus = useSearchParams().get('status')
  const [message, setMessage] = useState('')

  const {
    data: recipient,
    isLoading: isRecipientLoading,
    error: recipientError
  }: any = useGetUserDetailsByUsername({
    username: params.username
  })

  const { mutate: submitMessageMutation, isLoading: isSubmitMessageLoading } =
    useSubmitMessage({
      onError: (error: any) => toast.error(error.message),
      onSuccess: (success: any) => {
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
    return (
      <BackgroundLayout watermarkText={recipient?.data?.username || ''}>
        <div className="mb-6 flex flex-col items-center gap-4">
          <div className="rounded-full bg-white/10 p-6 backdrop-blur-sm">
            <Frown className="h-20 w-20 text-white" />
          </div>
          <p className="text-2xl font-medium text-white">
            {recipientError.message}
          </p>
          <p className="text-center text-lg text-white/90">
            Check the link again and give it another shot!
          </p>
        </div>
        <CreateLink />
      </BackgroundLayout>
    )
  }

  if (messageStatus === 'sent') {
    return (
      <BackgroundLayout watermarkText={recipient?.data?.username || ''}>
        <div className="flex flex-col items-center gap-5">
          <div className="rounded-full bg-white/10 p-6 backdrop-blur-sm">
            <CircleCheck className="h-16 w-16 text-white" />
          </div>
          <p className="bg-gradient-to-r from-white to-white/90 bg-clip-text text-2xl font-semibold text-transparent">
            Message Sent Successfully!
          </p>
        </div>

        <div className="my-8 flex w-full flex-col gap-4">
          <p className="rounded-xl bg-white/10 px-6 py-5 text-center text-xl font-medium tracking-wide text-white backdrop-blur-sm">
            {recipient?.data?.feedback_message}
          </p>
          <p className="text-center text-sm text-white/80">
            Message sent to{' '}
            <span className="font-medium text-white">
              {recipient?.data?.name}
            </span>
          </p>
        </div>

        <CreateLink />

        <Button
          className="mt-8 h-12 w-full text-lg font-medium text-white/90 underline-offset-8 hover:scale-105 hover:text-white"
          size="lg"
          variant="link"
          onClick={() => router.back()}
        >
          Send Another Message
        </Button>
      </BackgroundLayout>
    )
  }

  return (
    <BackgroundLayout watermarkText={recipient?.data?.username || ''}>
      <div className="flex flex-col items-center rounded-xl border border-white/30 bg-white/10 p-4 text-white backdrop-blur-md">
        <p className="text-center text-2xl font-medium capitalize tracking-wide text-white">
          Secret Message for {recipient?.data?.name}
        </p>
      </div>

      <div
        className={cn(
          'group relative overflow-hidden rounded-xl bg-white p-4 backdrop-blur-md',
          {
            'cursor-not-allowed bg-gray-500/20': recipient?.data?.is_inbox_full
          }
        )}
      >
        {recipient?.data?.is_inbox_full ? (
          <div className="text-center text-xl text-white/90">
            {recipient?.message}
          </div>
        ) : (
          <>
            <textarea
              className="h-[180px] w-full resize-none bg-transparent text-xl placeholder-zinc-400 focus:outline-none"
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

      {!recipient?.data?.is_inbox_full && (
        <p className="-translate-y-2 text-right text-sm text-white/80">
          <span className="font-medium">{message.length}</span>
          {' / '}
          <span className="text-white/60">
            {recipient?.data?.message_max_length || '-'}
          </span>
        </p>
      )}

      <Button
        className="mt-6 h-14 w-full transform text-lg font-medium transition-all hover:scale-[1.02] disabled:opacity-50"
        disabled={
          recipient?.data?.is_inbox_full ||
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

      <CreateLink />
    </BackgroundLayout>
  )
}

export default SendMessage

const BackgroundLayout = ({
  children,
  watermarkText
}: {
  children: React.ReactNode
  watermarkText: string
}) => {
  return (
    <Watermark gutter={50} text={watermarkText} textColor="#BBB">
      <div className="flex min-h-screen w-full flex-col items-center gap-6 bg-gradient-to-b from-gray-50 to-gray-100 p-5">
        <div className="z-10 backdrop-blur-sm">
          <Branding />
        </div>
        <Card className="z-10 w-full max-w-[32rem] space-y-6 rounded-2xl bg-gradient-to-br from-ckret-primary to-ckret-secondary p-6 shadow-2xl">
          {children}
        </Card>
        <Link
          className="mt-auto text-gray-500 underline-offset-4 backdrop-blur-sm hover:underline"
          href="/legal/disclaimer"
          target="_blank"
        >
          Disclaimer
        </Link>
      </div>
    </Watermark>
  )
}
