import { useMutation, useQuery } from '@tanstack/react-query'

import ckretConnect from '@/lib/api'
import { TApiPromise, TMutationOpts, TQueryOpts } from '@/types/api'
import { TMessage } from '@/types/index'

type TSubmitMessagePayload = {
  recipientUsername: string
  messageContent: string
}

type TDeleteSingleMessagePayload = {
  mid: string
}

// Message Services
const submitMessage = (payload: TSubmitMessagePayload): TApiPromise => {
  return ckretConnect.post('/message/submit', payload)
}

const getAllMessages = (): TApiPromise<TMessage[]> => {
  return ckretConnect.get('/message/all')
}

const deleteSingleMessage = (
  payload: TDeleteSingleMessagePayload
): TApiPromise => {
  return ckretConnect.delete(`/message/single-message/${payload.mid}`)
}

const deleteAllMessages = (): TApiPromise => {
  return ckretConnect.delete('/message/all')
}

const replyToMessage = (payload: {
  mid: string
  replyContent: string
}): TApiPromise => {
  return ckretConnect.put(`/message/reply/${payload.mid}`, {
    replyContent: payload.replyContent
  })
}

const toggleMessageVisibility = (payload: { mid: string }): TApiPromise => {
  return ckretConnect.put(`/message/visibility/${payload.mid}`)
}

// Message Hooks
export const useSubmitMessage = (
  opts?: TMutationOpts<{ recipientUsername: string; messageContent: string }>
) => {
  return useMutation({
    mutationFn: (payload) => submitMessage(payload),
    ...opts
  })
}

export const useGetAllMessages = (opts?: TQueryOpts<TMessage[]>) => {
  return useQuery({
    queryKey: ['get-all-messages'],
    queryFn: getAllMessages,
    ...opts
  })
}

export const useDeleteSingleMessage = (
  opts?: TMutationOpts<{ mid: string }>
) => {
  return useMutation({
    mutationFn: (payload) => deleteSingleMessage(payload),
    ...opts
  })
}

export const useDeleteAllMessages = (opts?: TMutationOpts) => {
  return useMutation({
    mutationFn: deleteAllMessages,
    ...opts
  })
}

export const useReplyToMessage = (
  opts?: TMutationOpts<{ mid: string; replyContent: string }>
) => {
  return useMutation({
    mutationFn: (payload) => replyToMessage(payload),
    ...opts
  })
}

export const useToggleMessageVisibility = (
  opts?: TMutationOpts<{ mid: string }>
) => {
  return useMutation({
    mutationFn: (payload) => toggleMessageVisibility(payload),
    ...opts
  })
}
