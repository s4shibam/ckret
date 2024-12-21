import React from 'react'

interface HeaderProps {
  title: string
  children?: React.ReactNode
}

const Header = ({ title, children }: HeaderProps) => {
  return (
    <nav className="fixed inset-x-0 top-0 z-30 h-16 border-b border-gray-300 bg-white md:pl-[18rem]">
      <div className="flex h-full items-center justify-between gap-4 p-4 md:px-8">
        <p className="text-xl font-medium capitalize tracking-wider sm:text-2xl">
          {title}
        </p>
        {children}
      </div>
    </nav>
  )
}

export default Header
