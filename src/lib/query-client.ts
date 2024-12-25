import { QueryClient, QueryKey } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
      retry: 0,
      refetchOnWindowFocus: false
    }
  }
})

export const invalidateQueries = (queryKey: QueryKey | QueryKey[]) =>
  queryClient.invalidateQueries({ queryKey })
