import type { Metadata } from 'next'
import { unstable_noStore as noStore } from 'next/cache'

import { env } from '@/lib/env'

type Props = {
  params: { username: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = params.username
  noStore()
  const data = await fetch(
    `${env.ckret_connect_url}/user/details/${username}`
  ).then((res) => res.json())

  const metadata = {
    title: `Ckret - ${data?.data?.name || 'User not found'}`,
    description: 'Send me anonymous sketches.'
  }

  return metadata
}

export default function SketchLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
