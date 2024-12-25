import { Frown } from 'lucide-react'

import Branding from './branding'
import CreateLink from './create-link'

const ProfileNotFound = () => {
  return (
    <div className="bg-ckret-gradient flex min-h-screen flex-col items-center gap-10 px-4 py-6">
      <div className="mb-20 flex justify-center">
        <Branding />
      </div>

      <div className="w-full max-w-lg space-y-4 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
          <Frown className="h-10 w-10 text-red-500" />
        </div>
        <h1 className="text-2xl font-semibold text-zinc-900">
          Profile Not Available
        </h1>
        <p className="text-zinc-600">
          This profile might not exist or the user may have disabled their
          inbox. Please check the username and try again.
        </p>
      </div>

      <div className="mt-20 rounded-2xl bg-gradient-to-br from-zinc-600 to-zinc-800 p-5">
        <div className="mx-auto w-full max-w-md">
          <CreateLink />
        </div>
      </div>
    </div>
  )
}

export default ProfileNotFound
