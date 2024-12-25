'use client'

import {
  AlertTriangle,
  Eraser,
  Loader as LRLoader,
  RefreshCw,
  Trash2
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import AnimatedLoader from '@/components/common/animated-loader'
import AllSketchesDeleteModal from '@/components/dashboard/all-sketches-delete-modal'
import Header from '@/components/dashboard/header'
import SketchCard from '@/components/dashboard/sketch-card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useGetAllSketches } from '@/hooks/api/sketch'
import { ISketch } from '@/types/index'

const SketchDashboard = () => {
  const { data: sessionData } = useSession()
  const [storageStatus, setStorageStatus] = useState<
    'full' | 'almost_full' | 'ok'
  >('ok')

  const {
    data: sketches,
    isLoading: isLoadingSketches,
    refetch: refetchSketches,
    isRefetching: isRefetchingSketches
  } = useGetAllSketches()

  useEffect(() => {
    const sketchLimit = sessionData?.user?.inbox_max_size ?? 0
    const sketchCount = sketches?.data?.length ?? 0
    const diff = sketchLimit - sketchCount

    if (diff === 0) {
      setStorageStatus('full')
    } else if (diff <= 5) {
      setStorageStatus('almost_full')
    } else {
      setStorageStatus('ok')
    }
  }, [sessionData?.user?.inbox_max_size, sketches?.data?.length])

  return (
    <div className="flex flex-col gap-5">
      <Header
        title={`Sketches (${sketches?.data?.length ?? 0}/${
          sessionData?.user?.inbox_max_size ?? 0
        })`}
      >
        <div className="flex gap-2">
          <Button
            disabled={isLoadingSketches || isRefetchingSketches}
            onClick={() => refetchSketches()}
          >
            {isRefetchingSketches ? (
              <LRLoader className="size-5 animate-spin" />
            ) : (
              <RefreshCw className="size-5" />
            )}
            <p className="ml-2 hidden md:block">Refresh</p>
          </Button>
          <AllSketchesDeleteModal>
            <Button variant="destructive">
              <Trash2 className="size-5" />
              <p className="ml-2 hidden md:block">Delete All</p>
            </Button>
          </AllSketchesDeleteModal>
        </div>
      </Header>

      {storageStatus !== 'ok' && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle className="flex justify-between">
            <p>
              {storageStatus === 'almost_full' && 'Sketch Limit Almost Reached'}
              {storageStatus === 'full' && 'Sketch Limit Reached'}
            </p>
            <p className="text-right">
              {sketches?.data?.length} / {sessionData?.user?.inbox_max_size}
            </p>
          </AlertTitle>
          <AlertDescription>
            {storageStatus === 'almost_full' &&
              'You are nearing your sketch limit. Please delete some sketches to save space.'}
            {storageStatus === 'full' &&
              'You have reached your sketch limit. Please delete some sketches to make space.'}
          </AlertDescription>
        </Alert>
      )}

      {isLoadingSketches && <AnimatedLoader />}

      {sketches?.data?.length === 0 && (
        <div className="grid w-full place-items-center pt-20 text-gray-300">
          <Eraser className="h-20 w-20" />
          <p className="text-xl font-medium tracking-wide">
            No sketches found!
          </p>
        </div>
      )}

      <div className="grid h-full w-full gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {sketches?.data?.map((sketch: ISketch) => (
          <SketchCard key={sketch._id} sketch={sketch} />
        ))}
      </div>
    </div>
  )
}

export default SketchDashboard
