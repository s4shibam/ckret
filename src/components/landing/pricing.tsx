import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  PRICING_FEATURES,
  PRICING_HEADING,
  PRICING_SUB_HEADING
} from '@/lib/constants'

const Pricing = () => {
  return (
    <section
      className="bg-gradient-to-bl from-white via-transparent to-orange-50"
      id="pricing"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6 lg:py-24">
        <div className="text-center">
          <h2 className="mx-auto w-fit border-x-8 border-ckret-secondary px-4 text-center text-4xl font-semibold sm:px-8 xl:text-6xl">
            {PRICING_HEADING}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600 lg:text-xl">
            {PRICING_SUB_HEADING}
          </p>
        </div>

        <div className="mt-16">
          <Card className="mx-auto max-w-4xl overflow-hidden">
            <div className="flex flex-col items-center border-b p-8 sm:p-10">
              <h3 className="text-3xl font-bold">Free Forever Plan</h3>
              <div className="mt-4 flex items-baseline text-5xl font-bold">
                $0
                <span className="ml-1 text-2xl font-medium text-gray-500">
                  / Month
                </span>
              </div>
              <p className="mt-5 text-center text-lg text-gray-500">
                No credit card required. Start using all features instantly.
              </p>
              <div className="mt-6">
                <Button
                  asChild
                  className="rounded-full px-8 text-base"
                  size="lg"
                >
                  <Link href="/sign-in">Get Started Now</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-8 p-8 sm:grid-cols-2 sm:p-10">
              {PRICING_FEATURES.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-orange-100">
                    <feature.Icon className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{feature.title}</h4>
                    <p className="mt-1 text-base/5 text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="mt-8 flex justify-center gap-4">
            <Badge className="px-4 py-1 text-sm" variant="outline">
              No Ads
            </Badge>
            <Badge className="px-4 py-1 text-sm" variant="outline">
              No Tracking
            </Badge>
            <Badge className="px-4 py-1 text-sm" variant="outline">
              Open Source
            </Badge>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pricing
