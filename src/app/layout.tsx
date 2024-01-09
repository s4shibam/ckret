import type { Metadata, Viewport } from 'next'
import { Fredoka } from 'next/font/google'

import OG_IMAGE from '@assets/og-image.png'

import './globals.css'
import AppProviders from '@providers/app-providers'

import {
  CKRET_URL,
  META_DESCRIPTION,
  META_KEYWORDS,
  META_TITLE
} from '@lib/constants'

import GoogleAnalytics from '@components/analytics/google-analytics'

const fredoka = Fredoka({ subsets: ['latin'] })

const imagesArray = [
  {
    url: OG_IMAGE.src,
    width: OG_IMAGE.width,
    height: OG_IMAGE.height,
    alt: 'Ckret'
  }
]

export const metadata: Metadata = {
  manifest: 'manifest.json',
  title: META_TITLE,
  description: META_DESCRIPTION,
  keywords: META_KEYWORDS,
  openGraph: {
    images: imagesArray
  },
  twitter: {
    card: 'summary_large_image',
    title: META_TITLE,
    description: META_DESCRIPTION,
    images: imagesArray
  },
  metadataBase: new URL(CKRET_URL)
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
