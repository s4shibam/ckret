'use client'

import { Check, CircleCheck, Eraser, Loader, Palette, Send } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { cn } from '@lib/utils'

import AnimatedLoader from '@components/common/animated-loader'
import Branding from '@components/common/branding'
import CreateLink from '@components/common/create-link'
import ProfileNotFound from '@components/common/profile-not-found'
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

    const currentRef = containerRef.current
    const resizeObserver = new ResizeObserver(updateCanvasSize)

    if (currentRef) {
      resizeObserver.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        resizeObserver.unobserve(currentRef)
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
    return <ProfileNotFound />
  }

  if (sketchStatus === 'sent') {
    return (
      <BackgroundLayout>
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-3 text-white">
            <CircleCheck className="size-9" />
            <span className="text-xl font-medium">Sketch delivered!</span>
          </div>

          <div className="w-full rounded-lg bg-white p-3 text-center">
            <p className="text-xl font-medium">
              {recipient?.data?.feedback_message}
            </p>
            <div className="mt-6 text-sm text-zinc-700">
              — {recipient?.data?.name} —
            </div>
          </div>

          <Button
            className="mt-6 h-14 w-full text-lg font-medium transition-all hover:scale-[1.02]"
            variant="secondary"
            onClick={() => router.back()}
          >
            Send Another Message
          </Button>
        </div>
      </BackgroundLayout>
    )
  }

  return (
    <BackgroundLayout>
      <div className="flex flex-col items-center rounded-lg bg-white/75 p-2 text-white backdrop-blur-md">
        <p className="bg-gradient-to-r from-zinc-700 to-zinc-900 bg-clip-text text-center text-xl font-medium capitalize tracking-wide text-transparent">
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
                  max={15}
                  min={3}
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
          className="w-full cursor-crosshair rounded-lg border-2 border-white/30 bg-white shadow-inner"
          height={canvasDimensions.height || 464}
          width={canvasDimensions.width || 464}
          onMouseDown={startDrawing}
          onMouseLeave={stopDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
        />
      </div>

      <Button
        className="mt-6 h-14 w-full rounded-lg text-lg font-medium transition-all hover:scale-[1.02] disabled:opacity-50"
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
    </BackgroundLayout>
  )
}

export default SendSketch

const BackgroundLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-ckret-secondary/20 via-ckret-primary/10 to-transparent p-5">
      <div className="z-10 backdrop-blur-sm">
        <Branding />
      </div>
      <Card className="z-10 w-full max-w-[32rem] space-y-6 rounded-2xl border-none bg-gradient-to-br from-ckret-primary to-ckret-secondary p-6 shadow-xl">
        {children}
      </Card>

      <div className="z-10 w-full max-w-[32rem] rounded-2xl bg-gradient-to-br from-zinc-600 to-zinc-800 p-5">
        <CreateLink />
      </div>

      <Link
        className="mt-auto text-gray-500 underline-offset-4 backdrop-blur-sm hover:underline"
        href="/legal/disclaimer"
        target="_blank"
      >
        Disclaimer
      </Link>
    </div>
  )
}
