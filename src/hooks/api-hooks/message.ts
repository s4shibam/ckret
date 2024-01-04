import { useMutation, useQuery } from 'react-query'

import ckretConnect from '@lib/api'

// Message Services
const submitMessage = (payload: {
  recipientUsername: string
  messageContent: string
}) => ckretConnect.post('/message/submit', payload)

const getAllMessages = () => ckretConnect.get('/message/all')

const deleteSingleMessage = (payload: { mid: string }) =>
  ckretConnect.delete(`/message/single-message/${payload.mid}`)

const deleteAllMessages = () => ckretConnect.delete('/message/all')

// Message Hooks
export const useSubmitMessage = ({ ...options }) =>
  useMutation(submitMessage, options)

export const useGetAllMessages = () =>
  useQuery(['get-all-messages'], getAllMessages)

export const useDeleteSingleMessage = ({ ...options }) =>
  useMutation(deleteSingleMessage, options)

export const useDeleteAllMessages = ({ ...options }) =>
  useMutation(deleteAllMessages, options)
