import { useMutation, useQuery } from '@tanstack/react-query'

import ckretConnect from '@/lib/api'
import { TApiPromise, TMutationOpts, TQueryOpts } from '@/types/api'
import { TSketch } from '@/types/index'

type TSubmitSketchPayload = {
  recipientUsername: string
  sketchFile: File
}

type TDeleteSingleSketchPayload = {
  sid: string
}

// Sketch Services
const submitSketch = (payload: TSubmitSketchPayload): TApiPromise => {
  const formData = new FormData()
  formData.append('recipientUsername', payload.recipientUsername)
  formData.append('sketch', payload.sketchFile)

  return ckretConnect.post('/sketch/submit', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

const getAllSketches = (): TApiPromise<TSketch[]> => {
  return ckretConnect.get('/sketch/all')
}

const deleteSingleSketch = (
  payload: TDeleteSingleSketchPayload
): TApiPromise => {
  return ckretConnect.delete(`/sketch/single-sketch/${payload.sid}`)
}

const deleteAllSketches = (): TApiPromise => {
  return ckretConnect.delete('/sketch/all')
}

const replyToSketch = (payload: {
  sid: string
  replyContent: string
}): TApiPromise => {
  return ckretConnect.put(`/sketch/reply/${payload.sid}`, {
    replyContent: payload.replyContent
  })
}

const toggleSketchVisibility = (payload: { sid: string }): TApiPromise => {
  return ckretConnect.put(`/sketch/visibility/${payload.sid}`)
}

// Sketch Hooks
export const useSubmitSketch = (opts?: TMutationOpts<TSubmitSketchPayload>) => {
  return useMutation({
    mutationFn: (payload) => submitSketch(payload),
    ...opts
  })
}

export const useGetAllSketches = (opts?: TQueryOpts<TSketch[]>) => {
  return useQuery({
    queryKey: ['get-all-sketches'],
    queryFn: getAllSketches,
    ...opts
  })
}

export const useDeleteSingleSketch = (
  opts?: TMutationOpts<TDeleteSingleSketchPayload>
) => {
  return useMutation({
    mutationFn: (payload) => deleteSingleSketch(payload),
    ...opts
  })
}

export const useDeleteAllSketches = (opts?: TMutationOpts) => {
  return useMutation({
    mutationFn: deleteAllSketches,
    ...opts
  })
}

export const useReplyToSketch = (
  opts?: TMutationOpts<{ sid: string; replyContent: string }>
) => {
  return useMutation({
    mutationFn: replyToSketch,
    ...opts
  })
}

export const useToggleSketchVisibility = (
  opts?: TMutationOpts<{ sid: string }>
) => {
  return useMutation({
    mutationFn: toggleSketchVisibility,
    ...opts
  })
}
