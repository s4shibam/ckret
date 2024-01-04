import { Squirrel } from 'lucide-react'
import React from 'react'

import Branding from '@components/common/branding'
import CreateLink from '@components/common/create-link'

const NotFound = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-gray-50 p-5 pb-20">
      <Branding />
      <div className="z-10 flex h-[90%] w-full max-w-[500px] flex-col items-center gap-8 rounded-lg bg-gradient-to-br from-ckret-primary to-ckret-secondary p-5">
        <div className="mb-10 flex flex-col items-center gap-2">
          <Squirrel className="h-28 w-28 text-white" />
          <p className="text-2xl font-medium">Page Not Found</p>
          <p className="text-center text-xl text-white">
            What did one anonymous message say to another?
            <br />
            &quot;I&apos;ve got a secret to tell you, but I can&apos;t spill the
            ink!&quot;
          </p>
        </div>
        <CreateLink />
      </div>
    </div>
  )
}

export default NotFound
