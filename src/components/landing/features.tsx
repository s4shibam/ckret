import Image from 'next/image'

import FRIENDS from '@assets/friends.webp'

import {
  FEATURE_HEADING,
  FEATURE_SUB_HEADING,
  MESSAGE_TYPES,
  MESSAGE_TYPES_HEADING,
  RECIPIENT_TYPES,
  RECIPIENT_TYPES_HEADING
} from '@lib/constants'

import { Separator } from '@components/ui/separator'

const Features = () => {
  return (
    <div
      className="bg-gradient-to-br from-orange-200 via-transparent to-transparent"
      id="use-case"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col justify-center gap-20 px-5 py-14 sm:py-28">
        <div>
          <p className="text-center text-4xl font-semibold xl:text-6xl">
            {FEATURE_HEADING}
          </p>
          <p className="mt-4 text-center text-2xl font-medium text-gray-700 xl:text-4xl">
            {FEATURE_SUB_HEADING}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-10">
          <div className="flex w-full max-w-[450px] flex-col gap-5 rounded-xl border-2 border-white bg-ckret-primary p-5 drop-shadow-md">
            <p className="whitespace-nowrap rounded-lg bg-white px-3 py-2 text-3xl font-semibold text-black xl:text-5xl">
              {MESSAGE_TYPES_HEADING}
            </p>

            {MESSAGE_TYPES.map((type) => (
              <div
                key={type.title}
                className="flex items-center gap-4 rounded-lg text-2xl font-medium capitalize drop-shadow-md xl:text-4xl"
              >
                <div className="rounded-lg bg-white p-2">
                  <type.Icon className="h-8 w-8 text-ckret-primary xl:h-10 xl:w-10" />
                </div>
                <p className="w-full rounded-lg bg-white px-3 py-2 text-black">
                  {type.title}
                </p>
              </div>
            ))}
          </div>

          <div className="flex w-full max-w-[450px] flex-col gap-5 rounded-xl border-2 border-white bg-ckret-secondary p-5 drop-shadow-md">
            <p className="whitespace-nowrap rounded-lg bg-white px-3 py-2 text-3xl font-semibold text-black xl:text-5xl">
              {RECIPIENT_TYPES_HEADING}
            </p>

            {RECIPIENT_TYPES.map((type) => (
              <div
                key={type.title}
                className="flex items-center gap-4 rounded-lg text-2xl font-medium capitalize drop-shadow-md xl:text-4xl"
              >
                <div className="rounded-lg bg-white p-2">
                  <type.Icon className="h-8 w-8 text-ckret-secondary xl:h-10 xl:w-10" />
                </div>
                <p className="w-full rounded-lg bg-white px-3 py-2 text-black">
                  {type.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Image
            alt="Image by Freepik"
            className="relative mx-auto block drop-shadow-lg"
            height={400}
            src={FRIENDS}
            width={400}
          />
          <Separator className="mx-auto max-w-7xl drop-shadow-xl" />
        </div>
      </div>
    </div>
  )
}

export default Features
