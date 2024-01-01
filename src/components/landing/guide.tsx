import { GUIDE_HEADING, GUIDE_NOTE, GUIDE_STEPS } from '@lib/constants'

const Guide = () => {
  return (
    <div
      className="mx-auto flex w-full max-w-7xl flex-col justify-center gap-16 px-5 py-14 sm:py-28"
      id="guide"
    >
      <p className="mx-auto w-fit border-x-8 border-ckret-primary px-4 text-center text-4xl font-semibold sm:px-8 xl:text-6xl">
        {GUIDE_HEADING}
      </p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {GUIDE_STEPS.map((step) => (
          <div
            key={step.id}
            className="rounded-lg bg-gradient-to-br from-ckret-primary to-ckret-secondary p-1 drop-shadow-md"
          >
            <div className="h-full w-full rounded-md bg-gradient-to-br from-orange-100 via-white to-white p-4">
              <div className="mb-4 flex w-fit items-center justify-center rounded-lg bg-black p-3">
                <step.Icon className="h-8 w-8 text-white xl:h-10 xl:w-10" />
              </div>
              <p className="mb-2 text-xl font-semibold md:text-2xl">
                {step.heading}
              </p>
              <p className="text-gray-600 md:text-lg">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mx-auto bg-white text-center text-xl font-medium">
        {GUIDE_NOTE}
      </p>
    </div>
  )
}

export default Guide
