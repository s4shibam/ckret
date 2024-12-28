import { useEffect, useRef, useState } from 'react'

import { DEFAULT_BRUSH_SIZE, DEFAULT_COLOR } from '@/lib/constants'

interface UseCanvasProps {
  containerRef: React.RefObject<HTMLDivElement>
}

interface CanvasDimensions {
  width: number
  height: number
}

export const useCanvas = ({ containerRef }: UseCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [isDrawing, setIsDrawing] = useState(false)
  const [brushSize, setBrushSize] = useState([DEFAULT_BRUSH_SIZE])
  const [currentColor, setCurrentColor] = useState(DEFAULT_COLOR)
  const [hasDrawn, setHasDrawn] = useState(false)
  const [canvasDimensions, setCanvasDimensions] = useState<CanvasDimensions>({
    width: 0,
    height: 0
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
  }, [containerRef])

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

  const changeBrushSize = (value: number[]) => {
    setBrushSize(value)
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.strokeStyle = currentColor
      ctx.lineWidth = brushSize[0]
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
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
      ctx.lineWidth = brushSize[0]
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
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

  const getCanvasBlob = (): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const canvas = canvasRef.current
      if (!canvas) {
        resolve(null)
        return
      }

      canvas.toBlob((blob) => {
        resolve(blob)
      }, 'image/png')
    })
  }

  return {
    canvasRef,
    isDrawing,
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
  }
}
