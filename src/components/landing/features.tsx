import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  FEATURE_HEADING,
  FEATURE_SUB_HEADING,
  MAIN_FEATURES,
  MESSAGE_TYPES,
  RECIPIENT_TYPES
} from '@/lib/constants'

const Features = () => {
  return (
    <section
      className="bg-gradient-to-br from-orange-100 via-transparent to-transparent"
      id="features"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6 lg:py-24">
        <div className="text-center">
          <h2 className="mx-auto max-w-5xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {FEATURE_HEADING}
          </h2>
          <p className="mx-auto mt-4 max-w-xs text-xl text-gray-600 lg:text-xl">
            {FEATURE_SUB_HEADING}
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {MAIN_FEATURES.map((feature) => (
            <Card
              key={feature.title}
              className="group relative overflow-hidden border-2 p-4 transition-all duration-300 hover:border-orange-200 hover:shadow-2xl"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 transition-transform group-hover:scale-110">
                <feature.Icon className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">{feature.title}</h3>
              <p className="mt-3 text-lg/6 text-gray-600">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-24">
          <Tabs className="w-full" defaultValue="message-types">
            <TabsList className="mx-auto flex h-auto w-full max-w-[400px] justify-center gap-2 rounded-full border-2 bg-orange-50/50 p-1">
              <TabsTrigger
                className="flex-1 rounded-full px-4 py-2 text-base text-black data-[state=active]:bg-white data-[state=active]:text-orange-600"
                value="message-types"
              >
                Scenarios
              </TabsTrigger>
              <TabsTrigger
                className="flex-1 rounded-full px-4 py-2 text-base text-black data-[state=active]:bg-white data-[state=active]:text-orange-600"
                value="recipient-types"
              >
                Share With
              </TabsTrigger>
            </TabsList>

            <TabsContent className="mt-8" value="message-types">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {MESSAGE_TYPES.map((type) => (
                  <Card
                    key={type.title}
                    className="group flex flex-col items-center gap-2 border p-4 transition-all hover:border-orange-200 hover:shadow-md"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 transition-transform group-hover:scale-105">
                      <type.Icon className="h-6 w-6 text-orange-600" />
                    </div>
                    <h4 className="text-lg font-medium capitalize">
                      {type.title}
                    </h4>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent className="mt-8" value="recipient-types">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {RECIPIENT_TYPES.map((type) => (
                  <Card
                    key={type.title}
                    className="group flex flex-col items-center gap-2 border p-4 transition-all hover:border-orange-200 hover:shadow-md"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 transition-transform group-hover:scale-105">
                      <type.Icon className="h-6 w-6 text-orange-600" />
                    </div>
                    <h4 className="text-lg font-medium capitalize">
                      {type.title}
                    </h4>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

export default Features
