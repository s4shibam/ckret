'use client'

import { Check, CircleCheck, Eraser, Loader, Palette, Send } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useRef } from 'react'
import toast from 'react-hot-toast'

import AnimatedLoader from '@/components/common/animated-loader'
import Branding from '@/components/common/branding'
import CreateLink from '@/components/common/create-link'
import ProfileNotFound from '@/components/common/profile-not-found'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Slider } from '@/components/ui/slider'
import { useSubmitSketch } from '@/hooks/api/sketch'
import { useGetUserDetailsByUsername } from '@/hooks/api/user'
import { useCanvas } from '@/hooks/use-canvas'
import { COLORS } from '@/lib/constants'
import { cn } from '@/lib/utils'

const SendSketch = ({ params }: { params: { username: string } }) => {
  const router = useRouter()
  const pathname = usePathname()
  const sketchStatus = useSearchParams().get('status')
  const containerRef = useRef<HTMLDivElement>(null)

  const {
    canvasRef,
    brushSize,
    currentColor,
    hasDrawn,
    canvasDimensions,
    changeBrushSize,
    setCurrentColor,
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas,
    getCanvasBlob
  } = useCanvas({ containerRef })

  const {
    data: recipient,
    isLoading: isRecipientLoading,
    error: recipientError
  } = useGetUserDetailsByUsername({
    username: params.username
  })

  const { mutate: submitSketchMutation, isPending: isSubmitSketchLoading } =
    useSubmitSketch({
      onError: (error) => toast.error(error.message),
      onSuccess: (success) => {
        clearCanvas()
        toast.success(success.message)
        router.push(pathname + '?status=sent')
      }
    })

  const handleSubmit = async () => {
    const blob = await getCanvasBlob()
    if (!blob) return

    const file = new File([blob], 'sketch.png', { type: 'image/png' })
    submitSketchMutation({
      sketchFile: file,
      recipientUsername: params.username
    })
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

      {recipient?.data?.is_sketch_inbox_full && (
        <div className="group relative cursor-not-allowed overflow-hidden rounded-lg bg-white/20 p-4 backdrop-blur-md">
          <div className="text-center text-base sm:p-2 sm:text-xl">
            {recipient?.message}
          </div>
        </div>
      )}

      {!recipient?.data?.is_sketch_inbox_full && (
        <div ref={containerRef} className="relative">
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
              <PopoverContent className="w-52">
                <div className="grid grid-cols-4 gap-2">
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
                <div className="mt-4 grid grid-cols-[1fr_0.5rem] items-center gap-1">
                  <Slider
                    className="w-full"
                    max={15}
                    min={3}
                    step={1}
                    value={brushSize}
                    onValueChange={changeBrushSize}
                  />
                  <span className="text-sm text-zinc-500">{brushSize[0]}</span>
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
      )}

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
    <div className="bg-ckret-gradient flex min-h-screen w-full flex-col items-center gap-6 p-5">
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
        className="mt-auto text-zinc-500 underline-offset-4 backdrop-blur-sm hover:underline"
        href="/legal/disclaimer"
        target="_blank"
      >
        Disclaimer
      </Link>
    </div>
  )
}
