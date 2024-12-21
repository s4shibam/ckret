import { format, formatDistanceToNow } from 'date-fns'
import html2canvas from 'html2canvas'
import { ArrowDown, ArrowUp } from 'lucide-react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { IMessage } from '@_types/types'

import LOGO_SECONDARY from '@assets/logo-secondary.svg'

import { CKRET_URL } from '@lib/constants'

import { Button } from '@components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@components/ui/dialog'

type Props = {
  children: React.ReactNode
  message: IMessage
}

const MessageFullScreenView = ({ message, children }: Props) => {
  const imageRef = useRef<HTMLDivElement>(null)
  const { data: session } = useSession()
  const [response, setResponse] = useState('')

  const handleSaveImage = async () => {
    if (imageRef.current) {
      try {
        await document.fonts.ready

        const canvas = await html2canvas(imageRef.current, { scale: 2 })
        const dataUrl = canvas.toDataURL('image/png')
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = `ckret-message-${format(
          new Date(),
          'yyyy-MM-dd-HH-mm-ss'
        )}.png`
        a.click()
      } catch (err) {
        toast.error('Unknown error occurred')
      }
    }
  }

  const handleShare = async () => {
    if (imageRef.current) {
      const canvas = await html2canvas(imageRef.current, { scale: 2 })
      const blobFile: Blob | null = await new Promise((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob)
        }, 'image/png')
      })

      if (!blobFile) {
        toast.error("Can't share, Download instead")
        return
      }

      const data = {
        files: [
          new File([blobFile], 'image.png', {
            type: blobFile.type
          })
        ]
      }

      try {
        if (!navigator.canShare(data)) {
          toast.error("Can't share, Download instead")
        }
        await navigator.share(data)
      } catch (err) {
        toast.error("Can't share, Download instead")
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="h-[90vh] max-h-[900px] max-w-4xl p-4 sm:p-6 md:p-8">
        <div className="flex h-full w-full flex-col gap-4 sm:gap-6">
          <div
            ref={imageRef}
            className="relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-gray-200/80 bg-gradient-to-b from-white to-gray-50/50 shadow-sm backdrop-blur-sm transition-all"
          >
            <div className="flex items-center gap-3 border-b border-gray-200/80 p-2 sm:p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-ckret-primary to-ckret-secondary text-white">
                  <span className="text-base font-medium">A</span>
                </div>
                <div>
                  <h3 className="font-medium leading-4 text-gray-900">
                    Anonymous
                  </h3>
                  <p className="text-sm capitalize text-gray-500">
                    {formatDistanceToNow(message.createdAt, {
                      addSuffix: true
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto p-4 sm:p-6">
              <div className="flex flex-col items-start gap-1">
                <div className="max-w-[75%] rounded-2xl rounded-bl-none bg-gradient-to-r from-ckret-primary/10 to-ckret-secondary/10 p-4 shadow-sm dark:from-ckret-primary/20 dark:to-ckret-secondary/20">
                  <p className="whitespace-pre-wrap text-base leading-relaxed text-gray-700">
                    {message.content}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                <div className="relative w-full max-w-[75%]">
                  <textarea
                    className="h-full min-h-[100px] w-full resize-none overflow-auto rounded-2xl rounded-br-none border-0 bg-gray-100 p-3 text-base leading-relaxed text-gray-700 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ckret-primary/20 focus:ring-offset-2 focus:ring-offset-white"
                    placeholder="Write your response here..."
                    value={response}
                    onChange={(e) => {
                      setResponse(e.target.value)
                      e.target.style.height = 'auto'
                      e.target.style.height = `${Math.min(
                        e.target.scrollHeight,
                        200
                      )}px`
                    }}
                  />
                  {!response && (
                    <div className="pointer-events-none absolute inset-x-0 -bottom-5 flex items-center justify-center text-center text-sm text-gray-400">
                      💡 Type your message here, then take a screenshot
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center border-t border-zinc-200 p-2 sm:p-4">
              <div className="flex items-center gap-2">
                <Image
                  alt="Logo"
                  className="size-5 rounded"
                  height={16}
                  src={LOGO_SECONDARY}
                  width={16}
                />
                <span className="text-sm text-zinc-400">
                  {`${CKRET_URL}/@${session?.user?.username}`}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                Anonymous & Encrypted
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row sm:gap-3">
            <Button
              className="hidden items-center gap-2 rounded-lg bg-gradient-to-r from-ckret-primary to-ckret-secondary px-4 py-2.5 text-sm font-medium text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl focus:ring-2 focus:ring-ckret-primary/20 sm:px-6 sm:text-base md:inline-flex"
              disabled={!response}
              onClick={handleShare}
            >
              <ArrowUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Share
            </Button>
            <Button
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-ckret-primary to-ckret-secondary px-4 py-2.5 text-sm font-medium text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl focus:ring-2 focus:ring-ckret-primary/20 sm:px-6 sm:text-base"
              disabled={!response}
              onClick={handleSaveImage}
            >
              <ArrowDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Download
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MessageFullScreenView
