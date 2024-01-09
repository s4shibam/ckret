import type { Metadata } from 'next'

type Props = {
  params: { username: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = params.username

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_CKRET_CONNECT_URL}/user/details/${username}`
  ).then((res) => res.json())

  const metadata = {
    title: `Ckret - ${data?.data?.name || 'User not found'}`,
    description: 'Send me anonymous messages.'
  }

  return metadata
}

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
