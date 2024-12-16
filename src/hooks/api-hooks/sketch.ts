import { useMutation, useQuery } from 'react-query'

import ckretConnect from '@lib/api'

// Sketch Services
const submitSketch = (payload: {
  recipientUsername: string
  sketchFile: File
}) => {
  const formData = new FormData()
  formData.append('recipientUsername', payload.recipientUsername)
  formData.append('sketch', payload.sketchFile)

  return ckretConnect.post('/sketch/submit', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

const getAllSketches = () => ckretConnect.get('/sketch/all')

const deleteSingleSketch = (payload: { sid: string }) =>
  ckretConnect.delete(`/sketch/single-sketch/${payload.sid}`)

const deleteAllSketches = () => ckretConnect.delete('/sketch/all')

// Sketch Hooks
export const useSubmitSketch = ({ ...options }) =>
  useMutation(submitSketch, options)

export const useGetAllSketches = () =>
  useQuery(['get-all-sketches'], getAllSketches)

export const useDeleteSingleSketch = ({ ...options }) =>
  useMutation(deleteSingleSketch, options)

export const useDeleteAllSketches = ({ ...options }) =>
  useMutation(deleteAllSketches, options)
