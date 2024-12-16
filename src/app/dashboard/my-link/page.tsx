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
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import SNAPCHAT from '@assets/snapchat.svg'
import WHATSAPP from '@assets/whatsapp.svg'

import { CKRET_URL } from '@lib/constants'

import { Button } from '@components/ui/button'

const socialMediaPlatforms = [
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
  const { data } = useSession()
  const [myLink, setMyLink] = useState('')
  const [linkType, setLinkType] = useState<'message' | 'sketch'>('message')

  useEffect(() => {
    if (linkType === 'message') {
      setMyLink(`${CKRET_URL}/cl/${data?.user?.username}`)
    } else {
      setMyLink(`${CKRET_URL}/cl/${data?.user?.username}/sketch`)
    }
  }, [data?.user?.username, linkType])

  const shareText =
    linkType === 'message'
      ? 'Send me anonymous messages!'
      : 'Send me anonymous sketches!'
  const hashtags = 'ckret,anonymous,messageme'

  const handleShare = (platform: string) => {
    let shareUrl = ''

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          myLink
        )}`
        break
      case 'instagram':
        toast.error(
          'To share on Instagram, open the app and paste the ckret link in your post.'
        )
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          myLink
        )}&title=${encodeURIComponent(shareText)}`
        break
      case 'sms':
        shareUrl = `sms:?body=${encodeURIComponent(`${shareText}\n${myLink}`)}`
        break
      case 'snapchat':
        shareUrl = `https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(
          myLink
        )}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          myLink
        )}&text=${encodeURIComponent(shareText)}&hashtags=${encodeURIComponent(
          hashtags
        )}`
        break
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          `${shareText}\n${myLink}`
        )}`
        break
      default:
        break
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank')
    }
  }

  const copyLinkToClipboard = () => {
    copy(`${shareText}\n${myLink}`)
    toast.success('Link copied to clipboard')
  }

  return (
    <div className="mx-auto flex w-full max-w-[800px] flex-col gap-4 text-xl">
      <div className="mb-4 flex justify-center gap-4">
        <Button
          className="text-base"
          size="lg"
          variant={linkType === 'message' ? 'default' : 'secondary'}
          onClick={() => setLinkType('message')}
        >
          Message Link
        </Button>
        <Button
          className="text-base"
          size="lg"
          variant={linkType === 'sketch' ? 'default' : 'secondary'}
          onClick={() => setLinkType('sketch')}
        >
          Sketch Link
        </Button>
      </div>

      <div className="flex flex-col items-center gap-2 rounded-lg border-2 border-gray-500 p-4">
        <p>
          The link to{' '}
          {linkType === 'message' ? 'message' : 'share a sketch with'} you is:
        </p>
        <code className="w-full break-words rounded-md bg-gray-300 px-2 py-1 text-center text-base font-semibold sm:text-xl">
          {myLink}
        </code>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Button
          className="justify-start"
          size="lg"
          variant="secondary"
          onClick={copyLinkToClipboard}
        >
          <ClipboardCopy />
          <p className="ml-4 text-xl">Copy Link to Clipboard</p>
        </Button>
        {socialMediaPlatforms.map((platform) => (
          <Button
            key={platform.key}
            className={`justify-start hover:opacity-90 ${platform.bg}`}
            size="lg"
            onClick={() => handleShare(platform.key)}
          >
            {platform.icon}
            <p className="ml-4 text-xl">Share on {platform.name}</p>
          </Button>
        ))}
      </div>

      <div className="rounded-lg border-2 border-ckret-primary p-4">
        Share the link on your social media handles and ask your friends,
        families, fans, and coworkers to send you secret messages or sketch with
        you. 🚀
      </div>
    </div>
  )
}

export default MyLink
