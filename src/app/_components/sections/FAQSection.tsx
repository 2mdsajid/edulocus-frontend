import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FAQ_QUESTIONS } from '@/lib/data'


const FAQSection: React.FC = () => {
  return (
    <section className="bg-color1 py-16 px-4 md:px-10 lg:px-20">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-700 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-xl text-center text-gray-800 mb-12">
          Find quick answers to common questions about our services and how we can help you succeed in your academic journey.
        </p>
        <Accordion type="single" collapsible className="w-full">
          {FAQ_QUESTIONS.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-purple-200">
              <AccordionTrigger className="text-left text-lg font-medium text-gray-700 hover:text-gray-900 py-4">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export default FAQSection