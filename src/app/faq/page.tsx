import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // Assuming these paths are correct
import { FAQ_QUESTIONS } from '@/lib/data';


import { constructMetadata } from '@/lib/data';

export const metadata = constructMetadata({
  title: 'EduLocus | FAQ',
  description: 'Frequently Asked Questions about EduLocus and its services.'
});



const FAQPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-50 to-purple-50 py-20 px-4 md:px-10 lg:px-20 xl:px-32">
      <section className="bg-white py-16 px-4 md:px-10 lg:px-20 rounded-xl shadow-lg border border-gray-100 max-w-4xl mx-auto w-full">
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-6 leading-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-center text-gray-700 mb-12 max-w-2xl mx-auto">
          Find quick answers to common questions about Edulocus&lsquo; services, how we can help you succeed in your academic journey.
        </p>
        <Accordion type="single" collapsible className="w-full">
          {FAQ_QUESTIONS.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b border-purple-200 last:border-b-0"
            >
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-800 hover:text-purple-700 py-4 transition-colors duration-200">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-4 leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
};

export default FAQPage;