import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { env } from '@/lib/env'

export type ShareLinkType = 'Message' | 'Sketch' | 'Profile'

const { ckret_url } = env

export const useShareLink = () => {
  const { data } = useSession()
  const [link, setLink] = useState('')
  const [linkType, setLinkType] = useState<ShareLinkType>('Profile')

  useEffect(() => {
    if (linkType === 'Message') {
      setLink(`${ckret_url}/@${data?.user?.username}/msg`)
    } else if (linkType === 'Sketch') {
      setLink(`${ckret_url}/@${data?.user?.username}/skc`)
    } else {
      setLink(`${ckret_url}/@${data?.user?.username}`)
    }
  }, [data?.user?.username, linkType])

  const shareTextMap: Record<ShareLinkType, string> = {
    Profile:
      'Interact anonymously with me through messages or sketches on Ckret!',
    Message: 'Send me anonymous messages on Ckret!',
    Sketch: 'Send me anonymous sketches on Ckret!'
  }

  const shareText = env.occasion_greetings
    ? `${env.occasion_greetings}\n${shareTextMap[linkType]}`
    : shareTextMap[linkType]
  const hashtags = `Ckret,Anonymous,${linkType}`

  const handleShare = (platform: string) => {
    let shareUrl = ''

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          link
        )}`
        break
      case 'instagram':
        toast.error(
          'To share on Instagram, open the app and paste the ckret link in your post.'
        )
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          link
        )}&title=${encodeURIComponent(shareText)}`
        break
      case 'sms':
        shareUrl = `sms:?body=${encodeURIComponent(`${shareText}\n${link}`)}`
        break
      case 'snapchat':
        shareUrl = `https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(
          link
        )}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          link
        )}&text=${encodeURIComponent(shareText)}&hashtags=${encodeURIComponent(
          hashtags
        )}`
        break
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          `${shareText}\n${link}`
        )}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank')
    }
  }

  return {
    link,
    linkType,
    setLinkType,
    shareText,
    handleShare
  }
}
