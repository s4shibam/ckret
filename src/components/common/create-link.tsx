'use client'

import { SquareArrowOutUpRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Button } from '@components/ui/button'

const CreateLink = () => {
  const [createdCount, setCreatedCount] = useState(169)

  useEffect(() => {
    const generateRandomIncrement = () => Math.floor(Math.random() * 5) + 1
    const generateRandomInterval = () => Math.floor(Math.random() * 5000) + 3000

    const updateCount = () => {
      setCreatedCount((prevCount) => prevCount + generateRandomIncrement())
      const nextInterval = generateRandomInterval()
      setTimeout(updateCount, nextInterval)
    }

    const initialDelay = generateRandomInterval()
    const intervalId = setTimeout(updateCount, initialDelay)

    return () => clearTimeout(intervalId)
  }, [])

  return (
    <div className="mt-auto flex w-full flex-col gap-2">
      <p className="text-center text-lg text-white">
        <span className="font-medium">{createdCount}+</span> people tapped the
        button in the last <span className="font-medium">3 hours</span>
      </p>
      <Button
        asChild
        className="h-12 bg-white text-xl capitalize text-black hover:bg-white/90"
      >
        <Link href="/create-account">
          <SquareArrowOutUpRight className="mr-2" /> Create your own link
        </Link>
      </Button>
    </div>
  )
}

export default CreateLink
