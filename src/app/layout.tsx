import type { Metadata, Viewport } from 'next'
import { Outfit } from 'next/font/google'

import OG_IMAGE from '@/assets/og-image.png'
import GoogleAnalytics from '@/components/common/google-analytics'
import { META_DESCRIPTION, META_KEYWORDS, META_TITLE } from '@/lib/constants'
import { env } from '@/lib/env'
import AppProviders from '@/providers/app-providers'

import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800']
})

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
  metadataBase: new URL(env.ckret_url)
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
      <body className={outfit.className}>
        <GoogleAnalytics />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
