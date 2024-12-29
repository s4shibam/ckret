import parse from 'html-react-parser'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { FAQS } from '@/lib/constants'
import { cn } from '@/lib/utils'

type FAQsProps = {
  minimal?: boolean
}

const FAQs = ({ minimal }: FAQsProps) => {
  const displayFaqs = minimal ? FAQS.slice(0, 6) : FAQS

  return (
    <div
      className="bg-gradient-to-bl from-rose-100 via-transparent to-transparent"
      id="faq"
    >
      <div
        className={cn(
          'mx-auto flex w-full max-w-5xl flex-col items-center gap-20 px-5',
          minimal ? 'py-14 sm:py-28' : 'py-24 sm:py-32'
        )}
      >
        <p className="mx-auto w-fit border-x-8 border-ckret-primary px-4 text-center text-4xl font-semibold sm:px-8 xl:text-6xl">
          Frequently Asked Questions
        </p>
        <div className="flex w-full flex-col items-center gap-10">
          <Accordion collapsible className="w-full" type="single">
            {displayFaqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger className="text-lg sm:text-xl">
                  <p className="w-full text-left">{faq.question}</p>
                </AccordionTrigger>
                <AccordionContent className="text-base sm:text-lg">
                  {parse(faq.answer)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {minimal && (
            <Link
              className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-ckret-primary to-ckret-secondary px-8 py-3 text-lg font-medium text-white transition-all duration-300 hover:gap-4"
              href="/faqs"
            >
              <span>View All</span>
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default FAQs
