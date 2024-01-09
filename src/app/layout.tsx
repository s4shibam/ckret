import type { Metadata, Viewport } from 'next'
import { Fredoka } from 'next/font/google'

import './globals.css'
import AppProviders from '@providers/app-providers'

import GoogleAnalytics from '@components/analytics/google-analytics'

const fredoka = Fredoka({ subsets: ['latin'] })

export const metadata: Metadata = {
  manifest: 'manifest.json',
  title: 'Ckret - Anonymous Messaging Platform',
  description:
    'Ckret is an anonymous messaging platform. Exchange anonymous questions, feedback, suggestions, dares, and challenges with your friends, families, and coworkers.',
  openGraph: {
    images: ['./icon.ico']
  }
}

export const viewport: Viewport = {
  themeColor: '#FF8A00'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={fredoka.className}>
        <GoogleAnalytics />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
