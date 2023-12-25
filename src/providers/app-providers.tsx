'use client'

import { SessionProvider } from 'next-auth/react'
import { QueryClientProvider } from 'react-query'

import { queryClient } from '@lib/query-client'

import ToasterProvider from './toaster-provider'

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <ToasterProvider />
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default AppProviders
