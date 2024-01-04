import { useMutation, useQuery } from 'react-query'

import ckretConnect from '@lib/api'

// User Services

// NOTE: Not in use currently - due to [next-auth][error][CLIENT_FETCH_ERROR]
export const googleProviderSignIn = (payload: {
  name: string
  email: string
}) => ckretConnect.post('/user/auth/google-signin', payload)

const updateName = (payload: { name: string }) =>
  ckretConnect.put('/user/name', payload)

const updateUsername = (payload: { username: string }) =>
  ckretConnect.put('/user/username', payload)

const updateFeedbackMessage = (payload: { feedbackMessage: string }) =>
  ckretConnect.put('/user/feedback-message', payload)

const toggleInboxStatus = () => ckretConnect.put('user/inbox-status')

const getUserDetailsByUsername = (username: string) =>
  ckretConnect.get(`user/details/${username}`)

// User Hooks
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
