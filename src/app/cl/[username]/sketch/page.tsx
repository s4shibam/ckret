'use client'

import { Watermark } from '@hirohe/react-watermark'
import {
  Check,
  CircleCheck,
  Eraser,
  Frown,
  Loader,
  Palette,
  Send
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { cn } from '@lib/utils'

import AnimatedLoader from '@components/common/animated-loader'
import Branding from '@components/common/branding'
import CreateLink from '@components/common/create-link'
import { Button } from '@components/ui/button'
import { Card } from '@components/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { Slider } from '@components/ui/slider'

import { useSubmitSketch } from '@api-hooks/sketch'
import { useGetUserDetailsByUsername } from '@api-hooks/user'

const COLORS = [
  '#000000',
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#FF00FF',
  '#00FFFF',
  '#FFA500',
  '#8A2BE2'
]
const DEFAULT_COLOR = COLORS[0]
const DEFAULT_BRUSH_SIZE = 10

const SendSketch = ({ params }: { params: { username: string } }) => {
  const router = useRouter()
  const pathname = usePathname()
  const sketchStatus = useSearchParams().get('status')

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [isDrawing, setIsDrawing] = useState(false)
  const [brushSize, setBrushSize] = useState([DEFAULT_BRUSH_SIZE])
  const [currentColor, setCurrentColor] = useState(DEFAULT_COLOR)
  const [hasDrawn, setHasDrawn] = useState(false)
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0
  })

  const {
    data: recipient,
    isLoading: isRecipientLoading,
    error: recipientError
  }: any = useGetUserDetailsByUsername({
    username: params.username
  })

  const { mutate: submitSketchMutation, isLoading: isSubmitSketchLoading } =
    useSubmitSketch({
      onError: (error: any) => toast.error(error.message),
      onSuccess: (success: any) => {
        clearCanvas()
        toast.success(success.message)
        router.push(pathname + '?status=sent')
      }
    })

  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const width = containerWidth
        const height = width
        setCanvasDimensions({ width, height })
      }
    }

    updateCanvasSize()

    const resizeObserver = new ResizeObserver(updateCanvasSize)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current)
      }
      resizeObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    if (
      canvasRef.current &&
      canvasDimensions.width > 0 &&
      canvasDimensions.height > 0
    ) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (ctx) {
        const tempCanvas = document.createElement('canvas')
        tempCanvas.width = canvas.width
        tempCanvas.height = canvas.height
        const tempCtx = tempCanvas.getContext('2d')
        if (tempCtx) {
          tempCtx.drawImage(canvas, 0, 0)
        }

        canvas.width = canvasDimensions.width
        canvas.height = canvasDimensions.height

        ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height)

        ctx.strokeStyle = currentColor
        ctx.lineWidth = brushSize[0]
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
      }
    }
  }, [canvasDimensions, currentColor, brushSize])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.strokeStyle = currentColor
      ctx.beginPath()
      ctx.moveTo(x, y)
      setIsDrawing(true)
      setHasDrawn(true)
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.strokeStyle = currentColor
      ctx.lineTo(x, y)
      ctx.stroke()
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      setHasDrawn(false)
    }
  }

  const handleSubmit = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'sketch.png', { type: 'image/png' })
        submitSketchMutation({
          sketchFile: file,
          recipientUsername: params.username
        })
      }
    }, 'image/png')
  }

  if (isRecipientLoading) {
    return <AnimatedLoader type="fullscreen" />
  }

  if (recipientError?.error) {
    return (
      <BackgroundLayout watermarkText={recipient?.data?.username || ''}>
        <div className="mb-6 flex flex-col items-center gap-4">
          <div className="rounded-full bg-white/10 p-6 backdrop-blur-sm">
            <Frown className="h-20 w-20 text-white" />
          </div>
          <p className="text-2xl font-medium text-white">
            {recipientError.message}
          </p>
          <p className="text-center text-lg text-white/90">
            Check the link again and give it another shot!
          </p>
        </div>
        <CreateLink />
      </BackgroundLayout>
    )
  }

  if (sketchStatus === 'sent') {
    return (
      <BackgroundLayout watermarkText={recipient?.data?.username || ''}>
        <div className="flex flex-col items-center gap-5">
          <div className="rounded-full bg-white/10 p-6 backdrop-blur-sm">
            <CircleCheck className="h-16 w-16 text-white" />
          </div>
          <p className="bg-gradient-to-r from-white to-white/90 bg-clip-text text-2xl font-semibold text-transparent">
            Sketch Sent Successfully!
          </p>
        </div>

        <div className="my-8 flex w-full flex-col gap-4">
          <p className="rounded-xl bg-white/10 px-6 py-5 text-center text-xl font-medium tracking-wide text-white backdrop-blur-sm">
            {recipient?.data?.feedback_message}
          </p>
          <p className="text-center text-sm text-white/80">
            Sketch sent to{' '}
            <span className="font-medium text-white">
              {recipient?.data?.name}
            </span>
          </p>
        </div>

        <CreateLink />

        <Button
          className="mt-8 h-12 w-full text-lg font-medium text-white/90 underline-offset-8 hover:scale-105 hover:text-white"
          size="lg"
          variant="link"
          onClick={() => router.back()}
        >
          Draw Another Sketch
        </Button>
      </BackgroundLayout>
    )
  }

  return (
    <BackgroundLayout watermarkText={recipient?.data?.username || ''}>
      <div className="flex flex-col items-center rounded-xl border border-white/30 bg-white/10 p-4 text-white backdrop-blur-md">
        <p className="text-center text-2xl font-medium capitalize tracking-wide text-white">
          Secret Sketch for {recipient?.data?.name}
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative flex flex-col items-center gap-2"
      >
        <div className="absolute bottom-3 right-3 z-10 flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="border-2"
                size="icon"
                style={{ borderColor: currentColor }}
                variant="outline"
              >
                <Palette className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40">
              <div className="grid grid-cols-3 gap-2">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    className="grid aspect-square size-full place-items-center rounded-full border border-black"
                    style={{
                      backgroundColor: color
                    }}
                    onClick={() => setCurrentColor(color)}
                  >
                    {color === currentColor && (
                      <Check
                        className={cn('h-5 w-5', {
                          'text-white': currentColor === '#000000'
                        })}
                      />
                    )}
                  </button>
                ))}
              </div>
              <div className="mt-4">
                <Slider
                  className="w-full"
                  min={3}
                  max={15}
                  step={1}
                  value={brushSize}
                  onValueChange={(value) => setBrushSize(value)}
                />
              </div>
            </PopoverContent>
          </Popover>

          <Button
            className="border-2"
            size="icon"
            variant="outline"
            onClick={clearCanvas}
          >
            <Eraser className="h-5 w-5" />
          </Button>
        </div>

        <canvas
          ref={canvasRef}
          className="w-full cursor-crosshair rounded-xl border-2 border-white/30 bg-white shadow-inner"
          height={canvasDimensions.height || 464}
          width={canvasDimensions.width || 464}
          onMouseDown={startDrawing}
          onMouseLeave={stopDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
        />
      </div>

      <Button
        className="mt-6 h-14 w-full transform text-lg font-medium transition-all hover:scale-[1.02] disabled:opacity-50"
        disabled={isSubmitSketchLoading || !hasDrawn}
        size="lg"
        variant="secondary"
        onClick={handleSubmit}
      >
        {isSubmitSketchLoading ? (
          <Loader className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <Send className="mr-2 h-5 w-5" />
        )}
        Send Sketch
      </Button>
      <CreateLink />
    </BackgroundLayout>
  )
}

export default SendSketch

const BackgroundLayout = ({
  children,
  watermarkText
}: {
  children: React.ReactNode
  watermarkText: string
}) => {
  return (
    <Watermark gutter={50} text={watermarkText} textColor="#BBB">
      <div className="flex min-h-screen w-full flex-col items-center gap-6 bg-gradient-to-b from-gray-50 to-gray-100 p-5">
        <div className="z-10 backdrop-blur-sm">
          <Branding />
        </div>
        <Card className="z-10 w-full max-w-[32rem] space-y-6 rounded-2xl bg-gradient-to-br from-ckret-primary to-ckret-secondary p-6 shadow-2xl">
          {children}
        </Card>
        <Link
          className="mt-auto text-gray-500 underline-offset-4 backdrop-blur-sm hover:underline"
          href="/legal/disclaimer"
          target="_blank"
        >
          Disclaimer
        </Link>
      </div>
    </Watermark>
  )
}
