import html2canvas from 'html2canvas'
import { ArrowDown, ArrowUp } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'
import toast from 'react-hot-toast'

import { ISketch } from '@_types/types'

import { Button } from '@components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@components/ui/dialog'

type Props = {
  children: React.ReactNode
  sketch: ISketch
}

const SketchFullScreenView = ({ sketch, children }: Props) => {
  const imageRef = useRef<HTMLDivElement>(null)

  const handleSaveImage = async () => {
    if (imageRef.current) {
      try {
        const canvas = await html2canvas(imageRef.current, {
          scale: 2,
          useCORS: true
        })
        const dataUrl = canvas.toDataURL('image/png')
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = `sketch-${sketch._id}.png`
        a.click()
      } catch (err) {
        toast.error('Unknown error occurred')
      }
    }
  }

  const handleShare = async () => {
    if (imageRef.current) {
      const canvas = await html2canvas(imageRef.current, {
        scale: 2,
        useCORS: true
      })
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
          new File([blobFile], `sketch-${sketch._id}.png`, {
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
        <div className="flex size-full flex-col gap-5">
          <div
            ref={imageRef}
            className="flex size-full flex-col gap-2 rounded-lg border-2 p-4"
          >
            <div className="relative h-full w-full">
              <Image
                fill
                alt={`Sketch ${sketch._id}`}
                className="h-full w-auto rounded-lg object-contain"
                crossOrigin="anonymous"
                src={sketch.sketch_url}
              />
            </div>
            <p className="text-center text-gray-700">ckret.xyz</p>
          </div>
          <div className="flex w-full justify-center gap-4">
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

export default SketchFullScreenView
