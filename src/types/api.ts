import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'

export type TSuccess<TData = undefined> = {
  message: string
  data?: TData
}

export type TError = {
  error: boolean
  message: string
  status_code: number
  status_text: string
}

export type TApiPromise<TData = undefined> =
  | Promise<TSuccess<TData>>
  | Promise<TError>

export type TQueryOpts<TResponse = undefined> = Omit<
  UseQueryOptions<TSuccess<TResponse>, TError>,
  'queryKey' | 'queryFn'
>

export type TMutationOpts<TVariables = void, TResponse = undefined> = Omit<
  UseMutationOptions<TSuccess<TResponse>, TError, TVariables>,
  'mutationKey' | 'mutationFn'
>
