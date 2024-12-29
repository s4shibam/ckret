import html2canvas from 'html2canvas'
import { RefObject } from 'react'
import toast from 'react-hot-toast'

type UseImageActionsProps = {
  fileName: string
  ref: RefObject<HTMLDivElement>
}

export const useImageActions = ({ fileName, ref }: UseImageActionsProps) => {
  const handleSaveImage = async () => {
    if (ref.current) {
      try {
        await document.fonts.ready
        const canvas = await html2canvas(ref.current, {
          scale: 10,
          useCORS: true
        })
        const dataUrl = canvas.toDataURL('image/png')
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = fileName
        a.click()
      } catch (err) {
        toast.error('Unknown error occurred')
      }
    }
  }

  const handleShareImage = async () => {
    if (ref.current) {
      const canvas = await html2canvas(ref.current, {
        scale: 10,
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
          new File([blobFile], fileName, {
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

  return {
    handleSaveImage,
    handleShareImage
  }
}
