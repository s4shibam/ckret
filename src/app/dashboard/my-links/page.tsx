'use client'

import copy from 'copy-text-to-clipboard'
import {
  ClipboardCopy,
  Facebook,
  Instagram,
  Linkedin,
  MessageSquareShare,
  Twitter
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import toast from 'react-hot-toast'

import SNAPCHAT from '@/assets/snapchat.svg'
import WHATSAPP from '@/assets/whatsapp.svg'
import Header from '@/components/dashboard/header'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ShareLinkType, useShareLink } from 'hooks/use-share-link'

export const SOCIAL_MEDIA_PLATFORMS = [
  {
    icon: <Facebook />,
    bg: 'bg-blue-600 hover:bg-blue-600',
    name: 'Facebook',
    key: 'facebook'
  },
  {
    icon: <Instagram />,
    bg: 'bg-pink-600 hover:bg-pink-600',
    name: 'Instagram',
    key: 'instagram'
  },
  {
    icon: <Linkedin />,
    bg: 'bg-blue-700 hover:bg-blue-700',
    name: 'LinkedIn',
    key: 'linkedin'
  },
  {
    icon: <MessageSquareShare />,
    bg: 'bg-stone-500 hover:bg-stone-500',
    name: 'SMS',
    key: 'sms'
  },
  {
    icon: <Image alt="" src={SNAPCHAT} />,
    bg: 'bg-yellow-500 hover:bg-yellow-500',
    name: 'Snapchat',
    key: 'snapchat'
  },
  {
    icon: <Twitter />,
    bg: 'bg-blue-400 hover:bg-blue-400',
    name: 'Twitter',
    key: 'twitter'
  },
  {
    icon: <Image alt="" src={WHATSAPP} />,
    bg: 'bg-green-500 hover:bg-green-500',
    name: 'WhatsApp',
    key: 'whatsapp'
  }
]

const MyLink = () => {
  const { link, linkType, setLinkType, shareText, handleShare } = useShareLink()

  const copyLinkToClipboard = () => {
    copy(`${shareText}\n${link}`)
    toast.success(`${linkType} link copied to clipboard`)
  }

  return (
    <div className="min-h-full w-full bg-zinc-50/50 pb-8">
      <Header title="My Links" />

      <div className="mx-auto w-full max-w-4xl space-y-6 rounded-xl bg-white p-6 shadow-sm">
        <Tabs
          defaultValue="Profile"
          onValueChange={(value) => setLinkType(value as ShareLinkType)}
        >
          <TabsList className="grid h-11 w-full grid-cols-3 bg-zinc-100">
            <TabsTrigger className="text-base" value="Profile">
              Profile
            </TabsTrigger>
            <TabsTrigger className="text-base" value="Message">
              Message
            </TabsTrigger>
            <TabsTrigger className="text-base" value="Sketch">
              Sketch
            </TabsTrigger>
          </TabsList>

          <TabsContent value={linkType}>
            <div className="mt-4 flex flex-col items-center gap-2 rounded-lg border-2 border-zinc-500 p-4">
              <p className="whitespace-pre-line text-center">{shareText}</p>
              <Link
                className="hover:text-ckret-secondary"
                href={link}
                target="_blank"
              >
                <span className="w-full break-words rounded-md bg-zinc-100 px-2 py-1 text-center text-sm font-medium tracking-wide sm:text-base">
                  {link}
                </span>
              </Link>
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid gap-4 sm:grid-cols-2">
          <Button
            className="justify-start"
            size="lg"
            variant="secondary"
            onClick={copyLinkToClipboard}
          >
            <ClipboardCopy />
            <p className="ml-4 text-base">Copy Link to Clipboard</p>
          </Button>
          {SOCIAL_MEDIA_PLATFORMS.map((platform) => (
            <Button
              key={platform.key}
              className={`justify-start hover:opacity-90 ${platform.bg}`}
              size="lg"
              onClick={() => handleShare(platform.key)}
            >
              {platform.icon}
              <p className="ml-4 text-base">Share on {platform.name}</p>
            </Button>
          ))}
        </div>

        <div className="rounded-lg border-2 border-ckret-primary p-4 text-center">
          Share the link on your social media handles and ask your friends,
          families, fans, and coworkers to send you secret messages or sketch
          with you. 🚀
        </div>
      </div>
    </div>
  )
}

export default MyLink
