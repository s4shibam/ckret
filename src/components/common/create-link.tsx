'use client'

import { Cable } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@components/ui/button'

import SignInModal from './signin-modal'

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
      <SignInModal>
        <Button className="h-12 text-xl capitalize" variant="secondary">
          <Cable className="mr-2" /> Create your own link
        </Button>
      </SignInModal>
    </div>
  )
}

export default CreateLink
