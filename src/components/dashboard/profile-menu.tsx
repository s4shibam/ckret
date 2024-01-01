'use client'

import { LogOut } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'

import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { Button } from '@components/ui/button'

const ProfileMenu = () => {
  const { data } = useSession()

  return (
    <div className="mt-auto flex w-full flex-col gap-4">
      <Button
        className="justify-start gap-2 px-4 text-lg"
        size="lg"
        variant="destructive"
        onClick={() => signOut({ callbackUrl: '/' })}
      >
        <LogOut />
        Log Out
      </Button>
      <div className="flex items-center gap-3 rounded-lg bg-gradient-to-br from-orange-100 to-rose-300 px-4 py-2">
        <Avatar>
          <AvatarImage alt="" src={data?.user?.image || ''} />
          <AvatarFallback>{data?.user?.name?.[0] || '@'}</AvatarFallback>
        </Avatar>
        <div>
          <p className="leading-5">{data?.user?.name}</p>
          <p className="leading-5 blur-sm hover:blur-none">
            {data?.user?.email}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProfileMenu
