'use client'

import { ReactLenis } from '@studio-freight/react-lenis'
import { SessionProvider } from 'next-auth/react'
import { QueryClientProvider } from 'react-query'

import ToasterProvider from './toaster-provider'

import { queryClient } from '@/lib/query-client'

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ReactLenis root>{children}</ReactLenis>
        <ToasterProvider />
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default AppProviders
