import Branding from '@components/common/branding'
import Footer from '@components/common/footer'

export default function LegalLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex min-h-screen w-full flex-col pt-16">
      <div className="fixed inset-x-0 top-0 z-10 flex h-16 items-center justify-center gap-2 border-b bg-white px-4 shadow-sm">
        <Branding />
        <code className="select-none rounded-md bg-gray-200 px-1.5 py-0.5 text-2xl">
          Legal
        </code>
      </div>
      <div className="mx-auto max-w-7xl p-5 pb-10 text-lg">{children}</div>
      <Footer />
    </main>
  )
}
