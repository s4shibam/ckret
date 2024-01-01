'use client'

import copy from 'copy-text-to-clipboard'
import {
  ClipboardCopy,
  Facebook,
  Instagram,
  MessageSquareShare,
  Twitter
} from 'lucide-react'
import Image from 'next/image'
import toast from 'react-hot-toast'

import SNAPCHAT from '@assets/snapchat.svg'
import WHATSAPP from '@assets/whatsapp.svg'

import { Button } from '@components/ui/button'

const socialMediaPlatforms = [
  {
    icon: <Facebook />,
    bg: 'bg-blue-600 hover:bg-blue-600',
    name: 'Facebook',
    key: 'facebook'
  },
  {
    icon: <Image alt="" src={WHATSAPP} />,
    bg: 'bg-green-500 hover:bg-green-500',
    name: 'WhatsApp',
    key: 'whatsapp'
  },
  {
    icon: <Twitter />,
    bg: 'bg-blue-400 hover:bg-blue-400',
    name: 'Twitter',
    key: 'twitter'
  },
  {
    icon: <Instagram />,
    bg: 'bg-pink-600 hover:bg-pink-600',
    name: 'Instagram',
    key: 'instagram'
  },
  {
    icon: <Image alt="" src={SNAPCHAT} />,
    bg: 'bg-yellow-500 hover:bg-yellow-500',
    name: 'Snapchat',
    key: 'snapchat'
  },
  {
    icon: <MessageSquareShare />,
    bg: 'bg-stone-500 hover:bg-stone-500',
    name: 'SMS',
    key: 'sms'
  }
]

const MyLink = () => {
  const myLink = 'https://example.com/cl/abcde'
  const shareText = 'Send me anonymous messages.'
  const hashtags = 'ckret,anonymous'

  const handleShare = (platform: string) => {
    let shareUrl = ''

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          myLink
        )}`
        break
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          `${myLink}\n${shareText}`
        )}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          myLink
        )}&text=${encodeURIComponent(shareText)}&hashtags=${encodeURIComponent(
          hashtags
        )}`
        break
      case 'instagram':
        toast.error(
          'To share on Instagram, open the app and paste the link in your post.'
        )
        break
      case 'snapchat':
        shareUrl = `https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(
          myLink
        )}`
        break
      case 'sms':
        shareUrl = `sms:?body=${encodeURIComponent(`${myLink}\n${shareText}`)}`
        break
      default:
        break
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank')
    }
  }

  const copyLinkToClipboard = () => {
    copy(shareText + '\n' + myLink)
    toast.success('Link copied to clipboard')
  }

  return (
    <div className="flex w-full max-w-[500px] flex-col gap-4 text-xl">
      <div className="flex flex-col items-center gap-2 rounded-lg border-2 border-gray-500 p-4">
        <p>The link to message you is: </p>
        <code className="w-full break-words rounded-md bg-gray-300 px-2 py-1 text-center font-semibold">
          {myLink}
        </code>
      </div>

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
      <div className="rounded-lg border-2 border-ckret-primary p-4">
        Share the link on your social media handles and ask your friends,
        families, fans and coworkers to send you secret messages. 🚀
      </div>
    </div>
  )
}

export default MyLink
