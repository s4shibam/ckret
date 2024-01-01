import html2canvas from 'html2canvas'
import { ArrowUp, ArrowDown } from 'lucide-react'
import { useRef } from 'react'
import toast from 'react-hot-toast'

import { Button } from '@components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@components/ui/dialog'

type Props = {
  children: React.ReactNode
  messageContent: string
}

const MessageFullScreenView = ({ messageContent, children }: Props) => {
  const imageRef = useRef<HTMLDivElement>(null)

  const handleSaveImage = async () => {
    if (imageRef.current) {
      try {
        const canvas = await html2canvas(imageRef.current, { scale: 2 })
        const dataUrl = canvas.toDataURL('image/png')
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = 'image.png'
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
      <DialogContent className="h-5/6 max-h-[900px] max-w-3xl p-5 pt-10">
        <div className="flex w-full flex-col gap-5">
          <div
            ref={imageRef}
            className="mx-auto flex h-full w-full flex-col justify-between rounded-lg border-2 p-4"
          >
            <div className="flex flex-col gap-4">
              <div className="inline-block rounded-lg bg-gradient-to-br from-ckret-primary to-ckret-secondary p-1 text-center text-lg font-semibold leading-10 tracking-wide text-white xl:p-4 xl:text-2xl">
                Anonymous Message
              </div>
              <div className="inline-block max-h-[20rem] overflow-auto rounded-lg border-2 bg-white p-2 text-center text-lg/5 font-medium xl:p-4 xl:text-2xl">
                {messageContent}
              </div>
            </div>

            <p className="text-center text-gray-700">ckret.xyz</p>
          </div>
          <div className="flex w-full justify-center gap-4">
            {/* TODO: Not working on mobile browser */}
            <Button className="hidden text-lg" size="lg" onClick={handleShare}>
              <ArrowUp className="mr-2 h-5 w-5" />
              Share
            </Button>
            <Button className="text-lg" size="lg" onClick={handleSaveImage}>
              <ArrowDown className="mr-2 h-5 w-5" />
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MessageFullScreenView
