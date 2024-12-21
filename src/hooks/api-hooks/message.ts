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

const replyToMessage = (payload: { mid: string; replyContent: string }) =>
  ckretConnect.put(`/message/reply/${payload.mid}`, { replyContent: payload.replyContent })

const toggleMessageVisibility = (payload: { mid: string }) =>
  ckretConnect.put(`/message/visibility/${payload.mid}`)

// Message Hooks
export const useSubmitMessage = ({ ...options }) =>
  useMutation(submitMessage, options)

export const useGetAllMessages = () =>
  useQuery(['get-all-messages'], getAllMessages)

export const useDeleteSingleMessage = ({ ...options }) =>
  useMutation(deleteSingleMessage, options)

export const useDeleteAllMessages = ({ ...options }) =>
  useMutation(deleteAllMessages, options)

export const useReplyToMessage = ({ ...options }) =>
  useMutation(replyToMessage, options)

export const useToggleMessageVisibility = ({ ...options }) =>
  useMutation(toggleMessageVisibility, options)
