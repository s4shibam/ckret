'use client'

import { useSession } from 'next-auth/react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const ProfileMenu = () => {
  const { data } = useSession()

  return (
    <div className="mt-auto flex w-full items-center gap-2 rounded-lg bg-gradient-to-br from-orange-100 to-rose-200 px-4 py-2">
      <Avatar>
        <AvatarImage alt="" src={data?.user?.image || ''} />
        <AvatarFallback>{data?.user?.name?.[0] || '@/'}</AvatarFallback>
      </Avatar>
      <div className="w-full">
        <p
          className="w-full max-w-[175px] truncate font-medium leading-4 tracking-wide"
          title={data?.user?.name || 'Anonymous'}
        >
          {data?.user?.name}
        </p>
        <p
          className="w-full max-w-[175px] truncate text-xs"
          title={data?.user?.username || 'N/A'}
        >
          {data?.user?.username || 'N/A'}
        </p>
      </div>
    </div>
  )
}

export default ProfileMenu
