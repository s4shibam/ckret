import { useMutation, useQuery } from '@tanstack/react-query'

import ckretConnect from '@/lib/api'
import { TApiPromise, TMutationOpts, TQueryOpts } from '@/types/api'
import { TMessage, TSketch, TUser } from '@/types/index'

type TAnonymousSignUpPayload = {
  username: string
  password: string
}

type TUserPublicProfileResponse = TUser & {
  messages: TMessage[]
  sketches: TSketch[]
}

// User Services
const anonymousSignUp = (
  payload: TAnonymousSignUpPayload
): TApiPromise<TUser & { token: string }> => {
  return ckretConnect.post('/user/auth/anonymous-signup', payload)
}

const linkGoogleAccount = (payload: { token: string }): TApiPromise =>
  ckretConnect.post('/user/auth/link-google', payload)

const updateName = (payload: {
  name: string
}): TApiPromise<{ name: TUser['name'] }> => {
  return ckretConnect.put('/user/name', payload)
}

const updateUsername = (payload: {
  username: string
}): TApiPromise<{ username: TUser['username'] }> => {
  return ckretConnect.put('/user/username', payload)
}

const updateAvatar = (payload: {
  avatar: string
}): TApiPromise<{ avatar: TUser['avatar'] }> => {
  return ckretConnect.put('/user/avatar', payload)
}

const updateFeedbackMessage = (payload: {
  feedbackMessage: string
}): TApiPromise<{ feedback_message: TUser['feedback_message'] }> => {
  return ckretConnect.put('/user/feedback-message', payload)
}

const toggleInboxStatus = (): TApiPromise<{
  is_inbox_enabled: TUser['is_inbox_enabled']
}> => {
  return ckretConnect.put('user/inbox-status')
}

const getUserDetailsByUsername = (
  username: string
): TApiPromise<TUser & { is_inbox_full: boolean }> => {
  return ckretConnect.get(`user/details/${username}`)
}

const getUserPublicProfile = (
  username: string
): TApiPromise<TUserPublicProfileResponse> => {
  return ckretConnect.get(`user/profile/${username}`)
}

// User Hooks

export const useAnonymousSignUp = (
  opts?: TMutationOpts<TAnonymousSignUpPayload, TUser & { token: string }>
) =>
  useMutation({
    mutationFn: (payload) => anonymousSignUp(payload),
    ...opts
  })

export const useLinkGoogleAccount = (
  opts?: TMutationOpts<{ token: string }>
) => {
  return useMutation({
    mutationFn: (payload) => linkGoogleAccount(payload),
    ...opts
  })
}

export const useUpdateName = (
  opts?: TMutationOpts<{ name: string }, { name: TUser['name'] }>
) =>
  useMutation({
    mutationFn: (payload) => updateName(payload),
    ...opts
  })

export const useUpdateUsername = (
  opts?: TMutationOpts<{ username: string }, { username: TUser['username'] }>
) =>
  useMutation({
    mutationFn: (payload) => updateUsername(payload),
    ...opts
  })

export const useUpdateAvatar = (
  opts?: TMutationOpts<{ avatar: string }, { avatar: TUser['avatar'] }>
) =>
  useMutation({
    mutationFn: (payload) => updateAvatar(payload),
    ...opts
  })

export const useUpdateFeedbackMessage = (
  opts?: TMutationOpts<
    { feedbackMessage: string },
    { feedback_message: TUser['feedback_message'] }
  >
) =>
  useMutation({
    mutationFn: (payload) => updateFeedbackMessage(payload),
    ...opts
  })

export const useToggleInboxStatus = (
  opts?: TMutationOpts<void, { is_inbox_enabled: TUser['is_inbox_enabled'] }>
) =>
  useMutation({
    mutationFn: () => toggleInboxStatus(),
    ...opts
  })

export const useGetUserDetailsByUsername = (
  params: { username: string },
  opts?: TQueryOpts<TUser & { is_inbox_full: boolean }>
) =>
  useQuery({
    queryKey: ['user-details-by-username', params],
    queryFn: () => getUserDetailsByUsername(params.username),
    ...opts
  })

export const useGetUserPublicProfile = (
  params: { username: string },
  opts?: TQueryOpts<TUserPublicProfileResponse>
) =>
  useQuery({
    queryKey: ['user-public-profile', params],
    queryFn: () => getUserPublicProfile(params.username),
    ...opts
  })
