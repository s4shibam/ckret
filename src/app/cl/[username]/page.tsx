'use client'

import { Watermark } from '@hirohe/react-watermark'
import { CheckCircle, Dice5, Loader, Send } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

import { getRandomMessage } from '@lib/sample-messages'
import { cn } from '@lib/utils'

import AnimatedLoader from '@components/common/animated-loader'
import Branding from '@components/common/branding'
import CreateLink from '@components/common/create-link'
import { Button } from '@components/ui/button'

import { useSubmitMessage } from '@api-hooks/message'
import { useGetUserDetailsByUsername } from '@api-hooks/user'

const SendMessage = ({ params }: { params: { username: string } }) => {
  const router = useRouter()
  const pathname = usePathname()
  const messageStatus = useSearchParams().get('message_status')
  const [message, setMessage] = useState('')

  const { data: recipient, isLoading: isRecipientLoading }: any =
    useGetUserDetailsByUsername({
      username: params.username
    })

  const { mutate: submitMessageMutation, isLoading: isSubmitMessageLoading } =
    useSubmitMessage({
      onError: (error: any) => toast.error(error.message),
      onSuccess: (success: any) => {
        setMessage('')
        toast.success(success.message)
        router.push(pathname + '?message_status=sent')
      }
    })

  const setRandomMessage = () => {
    const randomMessage = getRandomMessage()
    setMessage(randomMessage)
  }

  const handleSubmit = () => {
    submitMessageMutation({
      messageContent: message,
      recipientUsername: params.username
    })
  }

  if (isRecipientLoading) {
    return <AnimatedLoader type="fullscreen" />
  }

  if (messageStatus === 'sent') {
    return (
      <div className="flex min-h-screen w-full flex-col items-center gap-4 bg-gray-50 p-5">
        <Branding />
        <div className="z-10 flex h-[90%] w-full max-w-[500px] flex-col items-center gap-8 rounded-lg bg-gradient-to-br from-ckret-primary to-ckret-secondary p-5">
          <div className="mb-10 flex flex-col items-center gap-2">
            <CheckCircle className="h-28 w-28 text-white" />
            <p className="text-2xl font-medium">Message Sent Successfully!</p>
          </div>

          <div className="flex w-full flex-col gap-2">
            <p className="bg-gradient-to-r from-transparent via-white to-transparent px-4 py-2 text-center text-xl font-medium">
              {recipient?.data?.feedback_message}
            </p>
            <p className="text-center text-sm text-white">
              From {recipient?.data?.name}
            </p>
          </div>

          <CreateLink />

          <Button
            className="mt-4 h-12 w-full text-xl text-white underline-offset-8"
            size="lg"
            variant="link"
            onClick={() => router.back()}
          >
            Send Another Message
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Watermark gutter={50} text={recipient?.data?.username} textColor="#BBB">
      <div className="flex min-h-screen w-full flex-col items-center gap-4 bg-gray-50 p-5">
        <div className="z-10 backdrop-blur-sm">
          <Branding />
        </div>
        <div className="z-10 flex h-[90%] w-full max-w-[500px] flex-col gap-4 rounded-lg bg-gradient-to-br from-ckret-primary to-ckret-secondary p-5 shadow-xl">
          <div className="flex flex-col items-center gap-2 rounded-lg border-2 border-black bg-white p-4 shadow-inner shadow-ckret-primary">
            <p className="text-center text-2xl font-semibold capitalize tracking-wide">
              Send me anonymous messages
            </p>

            <p className="text-center">
              This message is for{' '}
              <span className="font-medium">{recipient?.data?.name}</span>
            </p>
          </div>
          <div
            className={cn(
              'relative flex h-[200px] items-center justify-center rounded-lg border-2 border-black bg-white p-4 shadow-inner shadow-ckret-secondary backdrop-blur-md',
              {
                'cursor-not-allowed bg-gray-300': recipient?.data?.is_inbox_full
              }
            )}
          >
            {recipient?.data?.is_inbox_full && (
              <div className="text-center text-xl text-black">
                {recipient?.message}
              </div>
            )}
            {!recipient?.data?.is_inbox_full && (
              <textarea
                className="h-full w-full resize-none bg-transparent text-xl caret-ckret-secondary focus:outline-none"
                id="message"
                maxLength={recipient?.data?.message_max_length}
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            )}
            {!recipient?.data?.is_inbox_full && (
              <Button
                className="group absolute bottom-2 right-2"
                size="icon"
                title="Random Question"
                onClick={setRandomMessage}
              >
                <Dice5 className="h-7 w-7 animate-[spin_5s_linear_infinite] text-white group-hover:animate-pause" />
              </Button>
            )}
          </div>

          {!recipient?.data?.is_inbox_full && (
            <p className="-mt-4 ml-auto text-white">
              <span className="font-medium">{message.length}</span>
              {' / '}
              {recipient?.data?.message_max_length || '-'}
            </p>
          )}

          <Button
            className="mb-10 mt-4 h-12 text-xl md:mb-20"
            disabled={recipient?.data?.is_inbox_full || isSubmitMessageLoading}
            size="lg"
            onClick={handleSubmit}
          >
            {isSubmitMessageLoading ? (
              <Loader className="mr-2 animate-spin" />
            ) : (
              <Send className="mr-2" />
            )}
            Send Message
          </Button>

          <CreateLink />
        </div>
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

export default SendMessage
