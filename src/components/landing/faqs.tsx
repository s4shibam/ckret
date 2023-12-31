import parse from 'html-react-parser'

import { FAQS } from '@lib/constants'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@components/ui/accordion'

const FAQs = () => {
  return (
    <div
      className="bg-gradient-to-bl from-rose-200 via-transparent to-transparent"
      id="faq"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-20 px-5 py-14 sm:py-28">
        <p className="mx-auto w-fit border-x-8 border-ckret-secondary px-4 text-center text-4xl font-semibold sm:px-8 xl:text-6xl">
          Frequently Asked Questions
        </p>
        <Accordion collapsible className="w-full" type="single">
          {FAQS.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger className="text-xl">
                <p className="w-full text-left">{faq.question}</p>
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                {parse(faq.answer)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

export default FAQs
