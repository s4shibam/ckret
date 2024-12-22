import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { CKRET_URL } from '@lib/constants'

export type ShareLinkType = 'Message' | 'Sketch' | 'Profile'

export const useShareLink = () => {
  const { data } = useSession()
  const [link, setLink] = useState('')
  const [linkType, setLinkType] = useState<ShareLinkType>('Message')

  useEffect(() => {
    if (linkType === 'Message') {
      setLink(`${CKRET_URL}/@${data?.user?.username}/msg`)
    } else if (linkType === 'Sketch') {
      setLink(`${CKRET_URL}/@${data?.user?.username}/skc`)
    } else {
      setLink(`${CKRET_URL}/@${data?.user?.username}`)
    }
  }, [data?.user?.username, linkType])

  const shareTextMap: Record<ShareLinkType, string> = {
    Profile: 'Interact anonymously with me through messages or sketches',
    Message: 'Send me anonymous messages!',
    Sketch: 'Send me anonymous sketches!'
  }

  const shareText = shareTextMap[linkType]
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
