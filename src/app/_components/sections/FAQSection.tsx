import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqData = [
  {
    question: "What services does your website offer?",
    answer: "We offer a comprehensive range of educational services including interactive MCQ tests, personalized study plans, detailed analytics, and expert-curated study materials for various entrance exams.",
  },
  {
    question: "How can I contact customer support?",
    answer: "You can reach our dedicated customer support team via email at edulocusweb@gmail.com or through the live chat feature on our website. We're available 24/7 to assist you.",
  },
  {
    question: "What is your refund policy?",
    answer: "We offer a 30-day money-back guarantee. If you're not satisfied with our services within the first 30 days of your subscription, you can request a full refund, no questions asked.",
  },
  {
    question: "Do you offer custom study plans?",
    answer: "Yes, we provide personalized study plans tailored to your specific needs, learning pace, and target exams. Our AI-powered system adapts to your progress and adjusts your plan accordingly.",
  },
  {
    question: "How often is your question bank updated?",
    answer: "Our question bank is continuously updated by our team of expert educators. We add new questions weekly and revise existing ones based on the latest exam patterns and trends.",
  },
]

const FAQSection: React.FC = () => {
  return (
    <section className="bg-color1 py-16 px-4 md:px-10 lg:px-20">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-purple-800 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12">
          Find quick answers to common questions about our services and how we can help you succeed in your academic journey.
        </p>
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((item, index) => (
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