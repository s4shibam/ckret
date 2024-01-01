'use client'

import { Watermark } from '@hirohe/react-watermark'
import { CheckCircle, Dice5, Send } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { MAX_CHAR_LIMIT_FOR_MESSAGE } from '@lib/constants'
import { getRandomMessage } from '@lib/sample-messages'

import Branding from '@components/common/branding'
import CreateLink from '@components/common/create-link'
import { Button } from '@components/ui/button'

const SendMessage = ({ params }: { params: { username: string } }) => {
  const router = useRouter()
  const messageStatus = useSearchParams().get('message_status')
  const [message, setMessage] = useState('')

  const setRandomMessage = () => {
    const randomMessage = getRandomMessage()
    setMessage(randomMessage)
  }

  const handleSubmit = () => {
    console.log('Submitted!', params.username)
  }

  if (messageStatus === 'sent') {
    return (
      <div className="flex min-h-screen w-full flex-col items-center gap-4 bg-gray-200 p-5">
        <Branding />
        <div className="z-10 flex h-[90%] w-full max-w-[500px] flex-col items-center gap-8 rounded-lg bg-gradient-to-br from-ckret-primary to-ckret-secondary p-5">
          <div className="mb-10 flex flex-col items-center gap-2">
            <CheckCircle className="h-28 w-28 text-white" />
            <p className="text-2xl font-medium">Message Sent Successfully!</p>
          </div>

          <div className="flex w-full flex-col gap-2">
            <p className="bg-gradient-to-r from-transparent via-white to-transparent p-2 text-center text-xl font-medium">
              Thank You
            </p>
            <p className="text-center text-sm text-white">From John Doe</p>
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
    <Watermark gutter={50} text="john_doe" textColor="#aaa">
      <div className="flex min-h-screen w-full flex-col items-center gap-4 bg-gray-200 p-5">
        <div className="z-10 backdrop-blur-sm">
          <Branding />
        </div>
        <div className="z-10 flex h-[90%] w-full max-w-[500px] flex-col gap-4 rounded-lg bg-gradient-to-br from-ckret-primary to-ckret-secondary p-5">
          <div className="flex flex-col items-center gap-2 rounded-lg border-2 border-black bg-white p-4 shadow-inner shadow-ckret-primary">
            <p className="text-center text-2xl font-semibold capitalize tracking-wide">
              Send me anonymous messages
            </p>

            <p className="text-center">
              This message is for <span className="font-medium">John Doe</span>
            </p>
          </div>
          <div className="relative h-[200px] rounded-lg border-2 border-black bg-white p-4 shadow-inner shadow-ckret-secondary backdrop-blur-md">
            <textarea
              className="h-full w-full resize-none bg-transparent text-xl caret-ckret-secondary focus:outline-none"
              id="message"
              maxLength={MAX_CHAR_LIMIT_FOR_MESSAGE}
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              className="group absolute bottom-2 right-2"
              size="icon"
              title="Random Question"
              onClick={setRandomMessage}
            >
              <Dice5 className="h-7 w-7 animate-[spin_3s_linear_infinite] text-white group-hover:animate-pause" />
            </Button>
          </div>
          <p className="-mt-4 ml-auto text-white">
            <span className="font-medium">{message.length}</span>
            {' / '}
            {MAX_CHAR_LIMIT_FOR_MESSAGE}
          </p>

          <Button
            className="mb-10 mt-4 h-12 text-xl md:mb-20"
            size="lg"
            onClick={handleSubmit}
          >
            <Send className="mr-2" /> Send Message
          </Button>

          <CreateLink />
        </div>
        <Link
          className="mt-auto text-gray-400 underline-offset-4 hover:underline"
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
