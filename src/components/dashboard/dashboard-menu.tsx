'use client'

import {
  Brush,
  MessageCircle,
  Settings,
  SquareArrowOutUpRight,
  User
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const DashboardMenu = () => {
  const pathname = usePathname()

  const menus = [
    {
      title: 'Profile',
      Icon: User,
      route: '/dashboard/profile'
    },
    {
      title: 'Messages',
      Icon: MessageCircle,
      route: '/dashboard/messages'
    },
    {
      title: 'Sketches',
      Icon: Brush,
      route: '/dashboard/sketches'
    },
    {
      title: 'Settings',
      Icon: Settings,
      route: '/dashboard/settings'
    },
    {
      title: 'My Links',
      Icon: SquareArrowOutUpRight,
      route: '/dashboard/my-links'
    }
  ]

  return (
    <div className="flex w-full justify-between gap-1.5 md:flex-col md:justify-start">
      {menus.map((menu) => (
        <Button
          key={menu.title}
          asChild
          className={cn(
            'justify-start gap-2 bg-transparent px-4 text-xl tracking-wide text-black hover:bg-zinc-100',
            {
              'bg-zinc-200': pathname === menu.route
            }
          )}
          size="lg"
        >
          <Link href={menu.route}>
            <menu.Icon className="size-6" />
            <div className="hidden md:block">{menu.title}</div>
          </Link>
        </Button>
      ))}
    </div>
  )
}

export default DashboardMenu
