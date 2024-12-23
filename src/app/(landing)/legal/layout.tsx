export default function LegalLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex min-h-screen w-full flex-col pt-16">
      <div className="mx-auto max-w-4xl p-5 pb-10 text-lg">{children}</div>
    </main>
  )
}
