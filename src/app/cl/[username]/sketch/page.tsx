'use client'

import { Watermark } from '@hirohe/react-watermark'
import {
  Check,
  CheckCircle,
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
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'

import { useSubmitSketch } from '@api-hooks/sketch'
import { useGetUserDetailsByUsername } from '@api-hooks/user'

const BRUSH_SIZE = 3
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
const ASPECT_RATIO = 3 / 2 // 3:2 aspect ratio

const SendSketch = ({ params }: { params: { username: string } }) => {
  const router = useRouter()
  const pathname = usePathname()
  const sketchStatus = useSearchParams().get('status')

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
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

  // Handle canvas resize
  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const width = containerWidth
        const height = width / ASPECT_RATIO
        setCanvasDimensions({ width, height })
      }
    }

    // Initial size calculation
    updateCanvasSize()

    // Add resize listener
    const resizeObserver = new ResizeObserver(updateCanvasSize)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    // Cleanup
    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current)
      }
      resizeObserver.disconnect()
    }
  }, [])

  // Initialize canvas context whenever dimensions change
  useEffect(() => {
    if (
      canvasRef.current &&
      canvasDimensions.width > 0 &&
      canvasDimensions.height > 0
    ) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (ctx) {
        // Save the current canvas content
        const tempCanvas = document.createElement('canvas')
        tempCanvas.width = canvas.width
        tempCanvas.height = canvas.height
        const tempCtx = tempCanvas.getContext('2d')
        if (tempCtx) {
          tempCtx.drawImage(canvas, 0, 0)
        }

        // Set new dimensions
        canvas.width = canvasDimensions.width
        canvas.height = canvasDimensions.height

        // Restore the content
        ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height)

        // Set drawing styles
        ctx.strokeStyle = currentColor
        ctx.lineWidth = BRUSH_SIZE
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
      }
    }
  }, [canvasDimensions, currentColor])

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
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-gray-50 p-5 pb-20">
        <Branding />
        <div className="z-10 flex h-[90%] w-full max-w-[500px] flex-col items-center gap-8 rounded-lg bg-gradient-to-br from-ckret-primary to-ckret-secondary p-5">
          <div className="mb-10 flex flex-col items-center gap-2">
            <Frown className="h-28 w-28 text-white" />
            <p className="text-2xl font-medium">{recipientError.message}</p>
            <p className="text-center text-xl text-white">
              Check the link again and give it another shot!
            </p>
          </div>
          <CreateLink />
        </div>
      </div>
    )
  }

  if (sketchStatus === 'sent') {
    return (
      <Watermark gutter={50} text={recipient?.data?.username} textColor="#BBB">
        <div className="flex min-h-screen w-full flex-col items-center gap-4 bg-gray-50 p-5">
          <Branding />
          <div className="z-10 flex h-[90%] w-full max-w-[500px] flex-col items-center gap-8 rounded-lg bg-gradient-to-br from-ckret-primary to-ckret-secondary p-5 shadow-xl">
            <div className="flex flex-col items-center gap-2">
              <CheckCircle className="h-28 w-28 text-white" />
              <p className="text-2xl font-medium">Sketch Sent Successfully!</p>
            </div>

            <div className="my-10 flex w-full flex-col gap-2">
              <p className="bg-gradient-to-r from-transparent via-white to-transparent px-4 py-2 text-center text-xl font-medium tracking-wide">
                {recipient?.data?.feedback_message}
              </p>
              <p className="text-center text-sm text-white">
                From{' '}
                <span className="font-medium">{recipient?.data?.name}</span>
              </p>
            </div>

            <CreateLink />

            <Button
              className="mt-4 h-12 w-full text-xl text-white underline-offset-8"
              size="lg"
              variant="link"
              onClick={() => router.back()}
            >
              Send Another Sketch
            </Button>
          </div>
        </div>
      </Watermark>
    )
  }

  return (
    <Watermark gutter={50} text={recipient?.data?.username} textColor="#BBB">
      <div className="flex min-h-screen w-full flex-col items-center gap-4 bg-gray-50 p-5">
        <div className="z-10 backdrop-blur-sm">
          <Branding />
        </div>
        <div className="z-10 flex h-[90%] w-full max-w-[500px] flex-col gap-4 rounded-lg bg-gradient-to-br from-ckret-primary to-ckret-secondary p-5 shadow-xl">
          <p className="rounded-lg border-2 border-black bg-white p-2 text-center text-lg font-semibold capitalize tracking-wide shadow-inner shadow-ckret-primary">
            Draw something for {recipient?.data?.name}
          </p>

          <div
            ref={containerRef}
            className="relative flex flex-col items-center gap-2"
          >
            <div className="absolute bottom-2 right-2 flex gap-2">
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
              className="w-full cursor-crosshair rounded-lg border-2 border-black bg-white shadow-inner shadow-ckret-secondary"
              height={canvasDimensions.height || 458}
              width={canvasDimensions.width || 458}
              onMouseDown={startDrawing}
              onMouseLeave={stopDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
            />
          </div>

          <Button
            className="mb-10 mt-4 h-12 text-xl md:mb-20"
            disabled={isSubmitSketchLoading || !hasDrawn}
            size="lg"
            onClick={handleSubmit}
          >
            {isSubmitSketchLoading ? (
              <Loader className="mr-2 animate-spin" />
            ) : (
              <Send className="mr-2" />
            )}
            Send Sketch
          </Button>

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
    </Watermark>
  )
}

export default SendSketch
