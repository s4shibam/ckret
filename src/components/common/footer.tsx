import Link from 'next/link'

import { DEVELOPER_PORTFOLIO_URL, FEEDBACK_FORM_URL } from '@lib/constants'

import Branding from '@components/common/branding'
import { Separator } from '@components/ui/separator'

const Footer = () => {
  return (
    <footer
      className="flex w-full flex-col gap-8 bg-gray-950 px-6 py-4 text-gray-100 sm:px-14 sm:py-6"
      id="footer"
    >
      <div className="flex flex-col gap-8 md:mr-10 md:flex-row md:justify-between">
        <div>
          <Branding />
          <p className="mt-4 max-w-96">
            Ckret <em>(pronounced secret)</em> allows its users to receive
            anonymous messages via personalized <em>Ckret Link</em> from your
            friends, families, neighbors, coworkers, fans and many more.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-3 text-lg">
            <p className="text-xl font-medium">Useful Links</p>
            <Link
              className="decoration-white underline-offset-4 hover:underline"
              href="/dashboard/profile"
            >
              Profile
            </Link>
            <Link
              className="decoration-white underline-offset-4 hover:underline"
              href="/dashboard/messages"
            >
              Messages
            </Link>
            <Link
              className="decoration-white underline-offset-4 hover:underline"
              href={FEEDBACK_FORM_URL || '#'}
              target="_blank"
            >
              Share Feedback
            </Link>
          </div>

          <div className="flex flex-col gap-3 text-lg">
            <p className="text-xl font-medium">Legal</p>
            <Link
              className="decoration-white underline-offset-4 hover:underline"
              href="/legal/disclaimer"
              target="_blank"
            >
              Disclaimer
            </Link>
            <Link
              className="decoration-white underline-offset-4 hover:underline"
              href="/legal/cookie-policy"
              target="_blank"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
      <Separator />
      <div className="flex w-full flex-wrap justify-between text-center">
        <p className="whitespace-nowrap">
          Developed with 🧡 by{' '}
          <a className="hover:underline" href={DEVELOPER_PORTFOLIO_URL}>
            Shibam Saha
          </a>
          .
        </p>
        <p className="whitespace-nowrap">© 2024 Ckret. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
