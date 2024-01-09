import type { Metadata, Viewport } from 'next'
import { Fredoka } from 'next/font/google'

import './globals.css'
import AppProviders from '@providers/app-providers'

import { META_DESCRIPTION, META_KEYWORDS, META_TITLE } from '@lib/constants'

import GoogleAnalytics from '@components/analytics/google-analytics'

const fredoka = Fredoka({ subsets: ['latin'] })

export const metadata: Metadata = {
  manifest: 'manifest.json',
  title: META_TITLE,
  description: META_DESCRIPTION,
  keywords: META_KEYWORDS,
  openGraph: {
    images: ['../assets/og-image.png', './icon.ico']
  },
  twitter: {
    card: 'summary_large_image',
    title: META_TITLE,
    description: META_DESCRIPTION,
    images: [
      {
        url: '../assets/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ckret'
      },
      './icon.ico'
    ]
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
