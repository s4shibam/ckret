'use client'

import { SquareArrowOutUpRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

const CreateLink = () => {
  const [createdCount, setCreatedCount] = useState(169)

  useEffect(() => {
    const generateRandomIncrement = () => Math.floor(Math.random() * 5) + 1
    const generateRandomInterval = () => Math.floor(Math.random() * 5000) + 3000

    const updateCount = () => {
      setCreatedCount((prevCount) =>
        Math.min(prevCount + generateRandomIncrement(), 999)
      )
      const nextInterval = generateRandomInterval()
      setTimeout(updateCount, nextInterval)
    }

    const initialDelay = generateRandomInterval()
    const intervalId = setTimeout(updateCount, initialDelay)

    return () => clearTimeout(intervalId)
  }, [])

  return (
    <div className="mt-auto flex w-full flex-col gap-2">
      <p className="text-center text-sm tracking-wide text-white sm:text-base">
        <span
          key={createdCount}
          className="inline-block w-[2.1rem] animate-jump font-medium sm:w-[2.3rem]"
        >
          {createdCount}+
        </span>{' '}
        People clicked this button in the last{' '}
        <span className="whitespace-nowrap font-medium">3 hours</span>
      </p>
      <Button
        asChild
        className="h-11 bg-white text-base capitalize text-black hover:bg-white/90 sm:h-12 sm:text-lg"
      >
        <Link href="/create-account">
          <SquareArrowOutUpRight className="mr-2 size-5 sm:size-6" /> Create
          your own link
        </Link>
      </Button>
    </div>
  )
}

export default CreateLink
