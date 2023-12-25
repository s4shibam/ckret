import { QueryClient, QueryKey } from 'react-query'

type QueryKeys = QueryKey | QueryKey[]

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
      retry: 0,
      suspense: false,
      refetchOnWindowFocus: false
    }
  }
})

export const invalidateQueries = (queries: QueryKeys) =>
  queryClient.invalidateQueries(queries)
