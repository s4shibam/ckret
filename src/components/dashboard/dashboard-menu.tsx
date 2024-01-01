'use client'

import { Cable, MessageCircle, Settings, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@components/ui/button'

const DashboardMenu = () => {
  const pathname = usePathname()

  const menus = [
    {
      title: 'Profile',
      icon: <User />,
      route: '/dashboard/profile'
    },
    {
      title: 'Messages',
      icon: <MessageCircle />,
      route: '/dashboard/messages'
    },
    {
      title: 'Settings',
      icon: <Settings />,
      route: '/dashboard/settings'
    },
    {
      title: 'My Link',
      icon: <Cable />,
      route: '/dashboard/my-link'
    }
  ]

  return (
    <div className="flex w-full justify-between gap-4 md:flex-col md:justify-start">
      {menus.map((menu) => (
        <Button
          key={menu.title}
          asChild
          className="justify-start gap-2 px-4 text-xl tracking-wide"
          size="lg"
          variant={pathname === menu.route ? 'secondary' : 'ghost'}
        >
          <Link href={menu.route}>
            {menu.icon}
            <div className="hidden md:block">{menu.title}</div>
          </Link>
        </Button>
      ))}
    </div>
  )
}

export default DashboardMenu
