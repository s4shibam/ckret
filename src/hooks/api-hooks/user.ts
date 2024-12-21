import { useMutation, useQuery } from 'react-query'

import ckretConnect from '@lib/api'

// User Services

// NOTE: Not in use currently - due to [next-auth][error][CLIENT_FETCH_ERROR]
export const googleProviderSignIn = (payload: {
  name: string
  email: string
}) => ckretConnect.post('/user/auth/google-signin', payload)

const linkGoogleAccount = (payload: { token: string }) =>
  ckretConnect.post('/user/auth/link-google', payload)

const updateName = (payload: { name: string }) =>
  ckretConnect.put('/user/name', payload)

const updateUsername = (payload: { username: string }) =>
  ckretConnect.put('/user/username', payload)

const updateFeedbackMessage = (payload: { feedbackMessage: string }) =>
  ckretConnect.put('/user/feedback-message', payload)

const toggleInboxStatus = () => ckretConnect.put('user/inbox-status')

const getUserDetailsByUsername = (username: string) =>
  ckretConnect.get(`user/details/${username}`)

const anonymousSignUp = (payload: { username: string; password: string }) =>
  ckretConnect.post('/user/auth/anonymous-signup', payload)

const getUserPublicProfile = (username: string) =>
  ckretConnect.get(`user/profile/${username}`)

const updateAvatar = (payload: { avatar: string }) =>
  ckretConnect.put('/user/avatar', payload)

// User Hooks
export const useLinkGoogleAccount = ({ ...options }) =>
  useMutation(linkGoogleAccount, options)

export const useUpdateName = ({ ...options }) =>
  useMutation(updateName, options)

export const useUpdateUsername = ({ ...options }) =>
  useMutation(updateUsername, options)

export const useUpdateFeedbackMessage = ({ ...options }) =>
  useMutation(updateFeedbackMessage, options)

export const useToggleInboxStatus = ({ ...options }) =>
  useMutation(toggleInboxStatus, options)

export const useGetUserDetailsByUsername = (params: { username: string }) =>
  useQuery(['user-details-by-username', params], () =>
    getUserDetailsByUsername(params.username)
  )

export const useAnonymousSignUp = ({ ...options }) =>
  useMutation(anonymousSignUp, options)

export const useGetUserPublicProfile = (params: { username: string }) =>
  useQuery(['user-public-profile', params], () =>
    getUserPublicProfile(params.username)
  )

export const useUpdateAvatar = ({ ...options }) =>
  useMutation(updateAvatar, options)
