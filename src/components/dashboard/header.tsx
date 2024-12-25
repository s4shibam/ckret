import React from 'react'

type HeaderProps = {
  title: string
  children?: React.ReactNode
}

const Header = ({ title, children }: HeaderProps) => {
  return (
    <nav className="fixed inset-x-0 top-0 z-30 h-16 md:pl-[16rem]">
      <div className="flex h-full items-center justify-between gap-4 border-b border-zinc-300 bg-white p-4 md:px-8">
        <p className="text-lg font-medium capitalize tracking-wider sm:text-xl">
          {title}
        </p>
        {children}
      </div>
    </nav>
  )
}

export default Header
