import {
  GUIDE_HEADING,
  GUIDE_NOTE,
  GUIDE_STEPS,
  GUIDE_SUB_HEADING
} from '@/lib/constants'

const Guide = () => {
  return (
    <section
      className="relative mx-auto w-full max-w-7xl px-5 py-14 sm:py-28"
      id="guide"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ckret-primary/5 blur-3xl" />
      </div>

      <div className="mb-16 text-center">
        <h2 className="mx-auto inline-block border-x-8 border-ckret-primary px-4 text-4xl font-semibold sm:px-8 xl:text-6xl">
          {GUIDE_HEADING}
        </h2>
        <div className="mt-6 text-zinc-600 md:text-lg">{GUIDE_SUB_HEADING}</div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
        {GUIDE_STEPS.map((step, index) => (
          <div
            key={step.id}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-ckret-primary to-ckret-secondary p-0.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="absolute right-4 top-4 text-7xl font-bold text-ckret-primary/10">
              {index + 1}.
            </span>

            <div className="h-full w-full rounded-[0.9rem] bg-white p-6">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ckret-secondary/10">
                  <step.Icon className="h-8 w-8 text-ckret-secondary" />
                </div>
              </div>

              <h3 className="mb-3 text-xl font-semibold md:text-2xl">
                {step.heading}
              </h3>
              <p className="text-zinc-600 md:text-lg/6">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="inline-block rounded-full bg-ckret-primary/5 px-6 py-4 text-xl font-medium text-zinc-800">
          {GUIDE_NOTE}
        </p>
      </div>
    </section>
  )
}

export default Guide
